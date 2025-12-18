import {  
  EditFilled, 
  DeleteFilled, 
  CheckOutlined, 
  CloseOutlined } from '@ant-design/icons';

  import { Button, Input } from 'antd';
  
  function TodoItem({
    todo,
  updateId,
  updateText,
  setUpdateText,
  cancelUpdate,
  updateTodo,
  handleToggle,
  startUpdate,
  deleteTodo,
}) {
    return (
      <li className='todo-item'>
            {updateId === todo.id ? (
              <>
              {/* 수정 모드 */}
              <Input 
              value={updateText} 
              onChange={(e) => setUpdateText(e.target.value)}
              />
              <Button icon={<CloseOutlined />} onClick={cancelUpdate}>
              <span className='blind'>취소</span>
              </Button>

              <Button icon={<CheckOutlined />} onClick={updateTodo}>
              <span className='blind'>저장</span>
              </Button>
              </>
            ) : (
              <>
              {/* 일반 모드 */}
            <div className="contents">
              <strong 
              className={`todo-text ${todo.isDone ? 'isDone' : ''}`}
              onClick={() => handleToggle(todo.id)}
              >
                {todo.text}
                </strong>
              <p>{todo.datetime}</p>
            </div>
            <div className="btn-group">
              <Button 
              color='default' 
              variant='filled' 
              icon={<EditFilled />}
              onClick={() => startUpdate(todo)}
              >
              Edit
              </Button>
              <Button 
              color='danger' 
              variant='filled' 
              icon={<DeleteFilled />}
              onClick={ () => deleteTodo(todo.id)}
              >
              Delete
              </Button>
            </div>
            </>)
             }
            

            
          </li>
    )
  }
  
  export default TodoItem