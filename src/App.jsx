import Title from 'antd/es/typography/Title';
import{ useEffect, useState} from 'react';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import InputTodo from './components/InputTodo';
import TodoItem from './components/TodoItem';
import TodoStats from './components/TodoStats';
dayjs.extend(relativeTime);
dayjs.locale("ko");

function App() {
  const [todos, setTodos] = useState(() => {
    const getTodos = localStorage.getItem('stTodos');
    return getTodos ? JSON.parse(getTodos) : []
  });
  const [inputTodo, setInputTodo] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [updateText, setUpdateText] = useState('');

  useEffect(() => {
    localStorage.setItem('stTodos', JSON.stringify(todos));
    console.log('setStorage 실행');
  }, [todos])

  

  const createTodo = () => {
    if( !inputTodo.trim()) return;
    const newTodo = {
      id : Date.now(),
      text : inputTodo,
      isDone : false,
      datetime : dayjs().format('MM.DD.YYYY / hh:mm a')
    };

    const updateTodos = [newTodo, ...todos];
    setTodos(updateTodos);
    setInputTodo('');
  };

  const deleteTodo = (selectedId) => {
    const updatedTodos = todos.filter(todo => todo.id !== selectedId);
    setTodos(updatedTodos);
  };

  // 수정모드 시작
  const startUpdate = (selectedTodo) => {
    setUpdateId(selectedTodo.id);
    setUpdateText(selectedTodo.text);
  }
  
  // 수정모드 취소
  const cancelUpdate = () => {
    setUpdateId(null);
    setUpdateText('');
  }

  // 수정한 것 저장하기(update)
  const updateTodo = () => {
    const updateTodos = todos.map((todo) => todo.id === updateId 
      ? {
        ...todo, 
        text:updateText, 
        datetime: dayjs().format('MM.DD.YYYY / hh:mm a')
        }
      : todo
    );
    setTodos(updateTodos)
    setUpdateId(null);
  };

  // 토글 기능(완료 여부)
  const handleToggle = (isDoneId) => {
    const updateTodos = todos.map((todo) => 
      todo.id === isDoneId ? { ...todo, isDone : !todo.isDone } : todo
    );
  setTodos(updateTodos);
  }

  const inputProps = {inputTodo, setInputTodo, createTodo};

  const itemProps = {
  updateId,
  updateText,
  setUpdateText,
  cancelUpdate,
  updateTodo,
  handleToggle,
  startUpdate,
  deleteTodo,
  }
  return (
    <>
    <div className='todo-container'>
      <Title level={1}>Eun-To-do</Title>

      <InputTodo {...inputProps} />

      <TodoStats todos={todos} />
      
      {updateId ? '수정모드' : '일반모드'}
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...itemProps} />
        ))}
      </ul>
    </div>
    </>
  );
}
    

export default App;
