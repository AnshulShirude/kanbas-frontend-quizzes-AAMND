import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStartVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import HelloRedux from "./ReduxExamples/HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./ReduxExamples/AddRedux";
import TodoItem from "./ReduxExamples/todos/TodoItem";
import TodoForm from "./ReduxExamples/todos/TodoForm";
import TodoList from "./ReduxExamples/todos/TodoList";


const Assignment4 = () => {
  function sayHello() {
    alert("Hello");
  }
  return (
    <>
      <h1>Assignment 4</h1>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <ReduxExamples />
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </>
  );
};
export default Assignment4;
