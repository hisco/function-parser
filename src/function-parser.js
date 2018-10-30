const parse = (function(){
    const   EMPTY_STRING = '',
            OPEN_TAG = '(',
            CLOSE_TAG = ')',
            END_OF_COMMAND = ';',
            ARG_SEP = ',',
            DISABLE_TAG = '\\',
            ALL_STRING_OPEN = split('\'"\`'),
            ALL_CLOSE = split('})]'),
            ALL_OPENS = split('{(['),
            MAP_OPEN_TO_CLOSE = {'{':'}','[':']','(':')'};

function split(s){
    return s.split(EMPTY_STRING)
}
function isChar(char){
    var n = char.charCodeAt(0);
    return ((n > 48 && n<58) || (n>96 && n<123) || (n>64&&n<91) )
}
function Command(){
    this.name = EMPTY_STRING;
    this.args = [];
}
function renderError(e,i , p){
    throw new TokenError(e,i,p)
}
const jparse = JSON.parse;
function TokenError(e,i , p){
    this.expected = e;
    this.instead = i;
    this.position = p;
}
function parse(str){
    var commands = [],
        lastCommand = new Command,
        nextChar,
        sizeOfString = str.length,
        currentChar = str[1],
        prevChar = str[0],
        i = 1,
        prevIsChar = isChar(prevChar),
        currentIsChar = isChar(currentChar),
        currentPart = prevChar,
        numberOfClose = 0,
        numberOfOpen = 0,
        distanceFromOpen = 0,
        isItStringOpen = false,
        stringScope,
        isTrueMeaning = true,
        openingStack = [];
        
    function addArgs(arg){
        lastCommand.args.push(arg ? jparse(arg) : null)
    }
    if (!prevIsChar){
        renderError('[a-zA-Z0-9]' , currentChar,i)
    }
    function isCurrentChartPartOf(a){
        return a.indexOf(currentChar)!==-1;
    }
    while(i<sizeOfString){
        prevChar = str[i-1];
        currentChar = str[i];
        nextChar = str[i+1];
        isTrueMeaning = prevChar != DISABLE_TAG;
        currentIsChar = isChar(currentChar);
        if (!stringScope && currentChar == CLOSE_TAG && isTrueMeaning){
            numberOfClose++;
            if (numberOfOpen && numberOfOpen == numberOfClose){
                if (nextChar == END_OF_COMMAND||!nextChar){
                    numberOfClose = 0;
                    numberOfOpen = 0;
                    if (distanceFromOpen!=0){
                        addArgs(currentPart);
                    }
                    distanceFromOpen =0;

                    commands.push(lastCommand);
                    lastCommand = new Command;
                    currentPart = EMPTY_STRING;
                    i++;
                }
                else{
                    renderError(CLOSE_TAG , currentChar,i)
                }
            }
        }
      
        else if(numberOfOpen>0||openingStack.length){
            distanceFromOpen++;
            if (isTrueMeaning){
                isItStringOpen = isCurrentChartPartOf(ALL_STRING_OPEN);
                if (stringScope ){
                    if (currentChar == stringScope)
                        stringScope = null;
                    currentPart+=currentChar;
                }
                else{
                    if ( currentChar == ARG_SEP && !openingStack.length){
                        addArgs(currentPart);
                        currentPart = EMPTY_STRING;
                    }
                    else if(isItStringOpen){
                        stringScope = currentChar;
                        currentPart+=currentChar;
                    }
                    else if (isCurrentChartPartOf(ALL_OPENS)){
                        openingStack.push(MAP_OPEN_TO_CLOSE[currentChar])
                        currentPart+=currentChar;
                    }
                    else if (isCurrentChartPartOf(ALL_CLOSE)){
                        if (openingStack[openingStack.length-1]==currentChar){
                            openingStack.pop();
                            currentPart+=currentChar;
                        }
                        else {
                            renderError(openingStack[openingStack.length-1],i,currentChar)
                        }
                    }
                    else{
                        currentPart+=currentChar;
                    }

                }
            }
            else
                currentPart+=currentChar;
            
        }
        else if(currentChar == OPEN_TAG && isTrueMeaning){
            numberOfOpen++;
            if (numberOfOpen==1){
                lastCommand.name+=currentPart;
                currentPart=EMPTY_STRING;
            }
        }
        else if(currentIsChar){
            currentPart+=currentChar;
        }
        else{
            renderError(CLOSE_TAG , currentChar,i)
        }
        i++;
    }
    return commands;
}
    return parse;
})();

module.exports = {
    parse
}