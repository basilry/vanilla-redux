// 2강 단계 코드들
import {createStore} from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul")


const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"

const addToDo = (text) => {
  return {
    type: ADD_TODO, 
    text
  }
}

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}

const reducer = (state = [], action) => {
  switch(action.type)  {
    case ADD_TODO:
      const newToDoObj = {text: action.text, id: Date.now()};
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
}

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id))
}

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ''
  toDos.forEach(toDo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = "DEL"
    btn.addEventListener('click', dispatchDeleteToDo)
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn)
    ul.appendChild(li);
  })
}

store.subscribe(paintToDos)

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
}

form.addEventListener("submit", onSubmit)


// 리덕스 쓰기 전 기존 코드
// const form = document.querySelector("form");
// const input = document.querySelector("input");
// const ul = document.querySelector("ul")

// const createTodo = toDo => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// }

// const onSubmit = e => {
//   e.preventDefault();
//   const toDo = input.value;
//   input.value = "";
//   createTodo(toDo);
// }

// form.addEventListener("submit", onSubmit)






// 아래쪽은 0~1강 단계 코드들

// 아래 코드들의 html파일 코드
// <body>
// <button id="add">Add</button>
// <span></span>
// <button id="minus">Minus</button>
// </body>




// 밑의 리덕스 코드를 리팩토링한 방식
// import {createStore} from "redux";

// const add = document.getElementById('add');
// const minus = document.getElementById('minus');
// const number = document.querySelector('span');

// number.innerText = 0;

// const Add = "Add"
// const Minus = "Minus"

// const countModifier = (count = 0, action) => {
//   switch(action.type) {
//     case Add:
//       return count + 1;
//     case Minus:
//       return count - 1;
//     default:
//       return count;
//   }
// };

// const onChange = () => {
//   number.innerText = countStore.getState();
// }

// countStore.subscribe(onChange)

// const countStore = createStore(countModifier);

// const handleAdd = () => {
//   countStore.dispatch({type: Add})
// }
// const handleMinus = () => {
//   countStore.dispatch({type: Minus})
// }

// add.addEventListener("click", handleAdd );
// minus.addEventListener("click", handleMinus);












// 리덕스를 통해 만든 방식
// import {createStore} from "redux";

// const add = document.getElementById('add');
// const minus = document.getElementById('minus');
// const number = document.querySelector('span');

// number.innerText = 0;

// // 스토어를 만들기 위해 필요한 인자. 리듀서.
// // 데이터를 수정하는 함수. 여기서 리턴하는 내용이 우리의 data가 된다.
// // state를 인자로 받고 함수 안에서 변화시킨 다음 state를 리턴한다.

// // action은 리덕스에서 함수를 부를때 쓰는 두번째 파라미터이다.
// const countModifier = (count = 0, action) => {
//   // console.log(count, action)
//   if(action.type === "Add") {
//     return count +1;
//   } else if(action.type === "Minus") {
//     return count -1;
//   } else {
//     return count;
//   }
// };

// // 데이터를 저장하는 곳. 스토어.
// const countStore = createStore(countModifier);

// // console.log(countStore)
// // 스토어를 콘솔로그 해보면 dispatch, getState, reducer, subscribe가 나온다

// // 즉, 스토어를 만든 뒤 리듀서를 초기값(Initial state)으로 부르고,
// // 리듀서에서는 초기값을 갖고 modifiy하여 리턴한다.


// // 이러한 형식을 갖고 리듀서에게 메시지를 보내어 값을 변화시킬 수 있다.
// // 중괄호 안에 있는 내용이 action이다.
// // countStore.dispatch({ type: "Add"})
// // countStore.dispatch({ type: "Add"})
// // countStore.dispatch({ type: "Add"})
// // countStore.dispatch({ type: "Add"})
// // countStore.dispatch({ type: "Add"})
// // countStore.dispatch({ type: "Minus"})

// // console.log(countStore.getState())


// //이제 버튼에 연결하는 방식을 알아보자. 2가지 방식이 있다.
// // 이걸 action이라 하는데, 액션은 꼭 객체여야 한다.
// //1번방식
// // add.addEventListener("click", () => countStore.dispatch({type: "Add"}));
// // minus.addEventListener("click", () => countStore.dispatch({type: "Minus"}));

// //2번방식
// const handleAdd = () => {
//   countStore.dispatch({type: "Add"})
// }
// const handleMinus = () => {
//   countStore.dispatch({type: "Minus"})
// }

// add.addEventListener("click", handleAdd );
// minus.addEventListener("click", handleMinus);


// // 위처럼 만들면 이제 html에 구독을 시켜줘야 한다.
// const onChange = () => {
//   number.innerText = countStore.getState();
// }

// countStore.subscribe(onChange)









// 리덕스 없이 만들 때의 코드

// const add = document.getElementById('add');
// const minus = document.getElementById('minus');
// const number = document.querySelector('span');

// let count = 0;
// number.innerText = count;

// const updateText = () => {
//   number.innerText = count;
// }

// const handleAdd = () => {
//   console.log('add')
//   count = count + 1;
//   updateText();
// }

// const handleMinus = () => {
//   console.log('minus')
//   count = count - 1;
//   updateText();
// }

// add.addEventListener('click', handleAdd)
// minus.addEventListener('click', handleMinus)