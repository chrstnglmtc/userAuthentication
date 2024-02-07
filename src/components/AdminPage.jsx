  import React, { useState } from 'react';
  import '../admin.css';

  const AdminPage = () => {
    const [content, setContent] = useState(
      <div>
        <h2>Welcome to the Admin Page</h2>
        <p></p>
      </div>
    );

    const showDashboard = () => {
      setContent(
        <div>
          <h1>Welcome to Tsukiden Admin Page</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit facere fuga amet eligendi ipsa ut dolores nemo voluptate exercitationem optio corporis obcaecati nobis ea, aliquid quis repudiandae necessitatibus officiis repellendus.</p>
          {/* Add more content as needed */}
        </div>
      );
    };

    const showUsers = () => {
      setContent(
        <div>
          <div className='table-container'>
          <h1>User Management</h1>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                  >
                                      <option value="Action">Option</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                  >
                   <option value="Action">Option</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                  >
                    <option value="Action">Option</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                  >
                    <option value="Action">Option</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                  >
                      <option value="Action">Option</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      );
    };

    const showAccountRecovery = () => {
      setContent(
        <div>
          <div className='table-container'>
          <h1>Account Recovery</h1>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                    >
                    <option value="Action">Option</option>
                         <option value="SendCode">Send OTP</option>
                          <option value="SendEmail">Reset Email</option>
                          <option value="Edit">Edit</option>
                          <option value="Delete">Delete</option>
      

                  </select>
                </td>
              </tr>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                    >
                    <option value="Action">Option</option>
                         <option value="SendCode">Send OTP</option>
                          <option value="SendEmail">Reset Email</option>
                          <option value="Edit">Edit</option>
                          <option value="Delete">Delete</option>
      

                  </select>
                </td>
              </tr>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                  >
              <option value="Action">Option</option>
                   <option value="SendCode">Send OTP</option>
                    <option value="SendEmail">Reset Email</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>

                  </select>
                </td>
              </tr>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                  >
              <option value="Action">Option</option>
                   <option value="SendCode">Send OTP</option>
                    <option value="SendEmail">Reset Email</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>


                  </select>
                </td>
              </tr>
              <tr>
                <td>Carlo Cruz</td>
                <td>Marc Carlo Bryan Cruz</td>
                <td>mcbcruz@tspi.com.ph</td>
                <td>
                  <select
                    id="userType"
                    onChange={handleAction}
                  >
              <option value="Action">Option</option>
                   <option value="SendCode">Send OTP</option>
                    <option value="SendEmail">Reset Email</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>

                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      );
    };

    const showSettings = () => {
      setContent(
        <div>
      <div className='table-container'>
          <h1>Course Completion</h1>
          <table>
              <thead>
                <tr>
                  <th>Instructor ID</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                         <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                        <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                        <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                          <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                       <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
        </div>
      );
    };

    const showInstructorTab = () => {
      setContent(
        <div>
         <div className='table-container'>
          <h1>Instructor tab</h1>
            <table>
              <thead>
                <tr>
                  <th>Instructor ID</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                      <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                         <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                           <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                        <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>CJ</td>
                  <td>CEEJAY NATAL</td>
                  <td>C programming, SQL, SVN</td>
                  <td>
                    <select
                      id="userType"
                      onChange={handleAction}
                    >
                          <option value="Action">Option</option>
                      <option value="Edit">Edit</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
      );
    };


    const handleAction = (e) => {
      const selectedAction = e.target.value;
      if (selectedAction === 'Edit') {
        handleEdit();
      } else if (selectedAction === 'Delete') {
        handleDelete();
      }
    };

    const handleEdit = () => {
      // Placeholder for handle edit action
      console.log('Edit action');
    };

    const handleDelete = () => {
      // Placeholder for handle delete action
      console.log('Delete action');
    };

    return (
      <div>
        <div id="sidebar">
          <a href="#" onClick={showDashboard}>Dashboard</a>
          <a href="#" onClick={showUsers}>User Management</a>
          <a href="#" onClick={showAccountRecovery}>Account Recovery</a>
          <a href="#" onClick={showSettings}>Course Completion</a>
          <a href="#" onClick={showInstructorTab}>Instructor Tab</a>
          {/* Add more sidebar links as needed */}
        </div>

        <div id="content">
          {content}
        </div>
      </div>
    );
  };

  export default AdminPage;
