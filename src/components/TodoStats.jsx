import {Flex, Tag} from 'antd';


function TodoStats({todos}) {
const total = todos.filter((todo) => todo.isDone).length;
const done = 3;
const remaining = total - done;
  return (
    <Flex className='stats-container' gap='8px' style={{margin:'1em 0'}}>
        <Tag color='gray' variant='filled'>
            Total {total}
        </Tag>
        <Tag color='green' variant='filled'>
            Done {done}
        </Tag>
        <Tag color='geekblue' variant='filled'>
            Total {remaining}
        </Tag>
    </Flex>   

  )
}

export default TodoStats