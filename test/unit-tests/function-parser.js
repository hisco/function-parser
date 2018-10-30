
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));

const {parse} = require('../../src/function-parser');
describe('FunctionParser', ()=> {
    describe('#parse', ()=> {
        it('Function with number args' , ()=>{
            const result = parse('ab(1,2)');
            expect(result).to.deep.equal([{
                name : 'ab',
                args : [1,2]
            }]); 
        });
        
        it('Function with string args' , ()=>{
            const result = parse('ab("1","2")');
            expect(result).to.deep.equal([{
                name : 'ab',
                args : ["1","2"]
            }]); 
        });
        it('Function with string json' , ()=>{
            const result = parse('ab({"test":1},[1,2])');
            expect(result).to.deep.equal([{
                name : 'ab',
                args : [{"test":1},[1,2]]
            }]); 
        });
        it('Function with true / null' , ()=>{
            const result = parse('ab(true,null)');
            expect(result).to.deep.equal([{
                name : 'ab',
                args : [true , null]
            }]); 
        });
        it('Function with string json' , ()=>{
            const result = parse('ab({"test":1},[{"nested" : {"array" : [1,2]}}])');
            expect(result).to.deep.equal([{
                name : 'ab',
                args : [{"test":1},[{"nested" : {"array" : [1,2]}}]]
            }]); 
        });

    });
});