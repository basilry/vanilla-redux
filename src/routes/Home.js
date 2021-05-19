import React, {useState} from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../components/ToDo"

function Home({toDos, addToDo}) {
  const [text, setText] = useState("")
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    addToDo(text)
    setText("")
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange}/>
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => 
          (<ToDo {...toDo} key={toDo.id}/>
        ))}
      </ul>
    </>
  )
}

// //mapStateToProps()를 통해 store에서 state를 가져올 것이다.
// function getCurrentState(state, ownProps) {
//   // 이 state는 store의 것.
//   // ownProps는 history, location, match, staticContext를 지님
//   console.log(state, ownProps)
//   return {sexy: true}
//   //여기서 리턴을 하게되면 위의 Home 펑션에서의 props의 기능이 추가된다.
// }

function mapStateToProps(state) {
  return {toDos: state}
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);