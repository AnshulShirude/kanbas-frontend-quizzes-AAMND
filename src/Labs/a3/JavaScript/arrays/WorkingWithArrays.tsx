import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingDataToFromArrays from "./AddingAndRemovingDataToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import JsonStringify from "../json/JSONStringify";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";

function WorkingWithArrays() {
  var functionScoped = 2;
  let blockScoped = 5;
  const constant1 = functionScoped - blockScoped;
  let numberArray1 = [1, 2, 3, 4, 5];
  let stringArray1 = ["string1", "string2"];

  let variableArray1 = [
    functionScoped,
    blockScoped,
    constant1,
    numberArray1,
    stringArray1,
  ];

  return(
    <>
       <h1>Working With Arrays!</h1>
       numberArray1= {numberArray1} <br />
       stringArray1= {stringArray1} <br />
       variableArray1 = {variableArray1}
       <ArrayIndexAndLength />
       <AddingAndRemovingDataToFromArrays />
       <ForLoops />
       <MapFunction />
       <JsonStringify />
       <FindFunction />
       <FindIndex />
       <FilterFunction />
    </>
 )
}

export default WorkingWithArrays;
