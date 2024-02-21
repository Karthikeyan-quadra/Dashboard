// // Dashboard.tsx
// import * as React from 'react';
// import type { IDashboardProps } from './IDashboardProps';
// import { Adding, Fetch } from "../helpers/Service";
// import { useState } from 'react';

// export default function Dashboard(props: IDashboardProps) {
//   const [description, setDescription] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const[tasks,setTasks] = useState<string>("")

//   const handleAddData = () => {
//     Adding(description, title, tasks);
//   };
//   const handleFetchData = async()=>{
//     const data:any = await Fetch();
//     setFetchedData(data);
//   };
  
//   return (
//     <div>
//       <label htmlFor="Title">Title:</label>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <label htmlFor="description">Description:</label>
//       <input
//         type="text"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//     <label htmlFor="tsk">Task:</label>
//     <input type="text"
//     value={tasks}
//     onChange={(e)=>setTasks(e.target.value)}
//        />

//       <button onClick={handleAddData}>Add data</button>
//       <button onClick={handleFetchData}>Get data</button>
//       <div>
//         <h2>Fetched Data:</h2>
//         <ul>
//           {fetchedData.map((item) => (
//             <li key={item.Id}>{item.Id}-{item.Title} - {item.Description} -{item.Tasks}</li>
//           ))}
//         </ul>
//       </div>
//       </div>      
//   );
// }


// Dashboard.tsx
import * as React from 'react';
import { useState } from 'react';
import { notification, Table, Input, Button, Space, Form, Row, Col } from 'antd';
import type { IDashboardProps } from './IDashboardProps';
import { Adding, Fetch } from "../helpers/Service";
import 'antd/dist/reset.css';

const { Column } = Table;
const { Item } = Form;

export default function Dashboard(props: IDashboardProps) {
  const [form] = Form.useForm();
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  const handleAddData = async () => {
    if (!title || !description || !tasks) {
      showErrorNotification('Please fill in all fields');
      return;
    }

    await Adding(description, title, tasks);
    fetchAndUpdateData();

    showSuccessNotification('Data added successfully');

    // Reset form values using resetFields and setFieldsValue
    form.resetFields();
    setTitle("");
    setDescription("");
    setTasks("");
  };
  
  const handleFetchData = async () => {
    fetchAndUpdateData();
  };

  const fetchAndUpdateData = async () => {
    const data: any = await Fetch();
    setFetchedData(data);
  };

  const showErrorNotification = (message: string) => {
    notification.error({
      message: 'Error',
      description: message,
      placement: 'topRight',
    });
  };

  const showSuccessNotification = (message: string) => {
    notification.success({
      message: 'Success',
      description: message,
      placement: 'topRight',
    });
  };
const customstyle = `:where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper .ant-table-thead >tr>th, :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper .ant-table-thead >tr>td {
  position: relative;
  color: #F3F2F2;
  font-weight: 600;
  text-align: start;
  background: #ffa416;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s ease;
}`

  return (
    <div style={{ padding: '20px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <h2 style={{textAlign:"center"}}>Add your Input to the list</h2>

        <Form form={form} labelCol={{ span: 8}} wrapperCol={{ span: 16 }} style={{ maxWidth: 550 }}>
          <Row align="middle">
            <Col span={24}>
              <Item name="title" label="Title" rules={[{ required: true }]}>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Item>
            </Col>
            <Col span={24}>
              <Item name="description" label="Description" rules={[{ required: true }]}>
                <Input
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Item>
            </Col>
            <Col span={24}>
              <Item name="tasks" label="Tasks" rules={[{ required: true }]}>
                <Input
                  placeholder="Tasks"
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                />
              </Item>
            </Col>
          </Row>

            <div style={{marginLeft:"262px"}}>
            <Space>

            <Button type="primary" onClick={handleAddData}>
              Add data
            </Button>
            <Button onClick={handleFetchData}>Get data</Button>
            </Space>

            </div>
        </Form>

        <div>
          <h2 style={{textAlign:"center", marginTop:"50px"}}>Dashboard with data from SP list</h2>
          <style>{customstyle}</style>
          <Table dataSource={fetchedData}>
            <Column title="ID" dataIndex="Id" key="Id" />
            <Column title="Title" dataIndex="Title" key="Title" />
            <Column title="Description" dataIndex="Description" key="Description" />
            <Column title="Tasks" dataIndex="Tasks" key="Tasks" />
          </Table>
        </div>
      </Space>
    </div>
  );
}
