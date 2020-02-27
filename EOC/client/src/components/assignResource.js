import React, { Component } from 'react';
import NavbarApp from './navbar.component'
import "../static/css/Resources.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default class assignResource extends Component{
    constructor(props) {
        super(props) 
        this.state = { 
           resources: [
              { id: 1, type: 'Ambulance', name: 'Mosaic Ambulance', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com' },
              { id: 2, type: 'Air Ambulance', name: 'Nodway county', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 3, type: 'Resource Truck', name: 'Military ', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 4, type: 'Field Aid Station', name: 'Nodaway', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 5, type: 'Resource Truck', name: 'Military ', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 6, type: 'Field Aid Station', name: 'Nodaway', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 1, type: 'Ambulance', name: 'Mosaic Ambulance', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com' },
              { id: 2, type: 'Air Ambulance', name: 'Nodway county', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 3, type: 'Resource Truck', name: 'Military ', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 4, type: 'Field Aid Station', name: 'Nodaway', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 5, type: 'Resource Truck', name: 'Military ', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'},
              { id: 6, type: 'Field Aid Station', name: 'Nodaway', status: 'Available', address: 'Maryville', contact: '123456789', email: 'sample@test.com'}
              
           ],
            rtype: ['ems','fire,hazmat,utilities,person']
         }
    }
    renderTableData() {
        return this.state.resources.map((resources, index) => {
           const { id, type, name, status,address, contact,email } = resources 
           return (
              <tr key={id}>
                 <input type='checkbox'></input>
                 <td>{id}</td>
                 <td>{type}</td>
                 <td>{name}</td>
                 <td>{status}</td>
                 <td>{address}</td>
                 <td>{contact}</td>
                 <td>{email}</td>
              </tr>
           )
        })
     }
    
     renderTableHeader() {
      let header = Object.keys(this.state.resources[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
    }
    render()
    {
        return (
        
        <div>
            <NavbarApp />
             <div style={{margin:"1%"}}>
                <h2 style={{textAlign:"left",marginBottom:'3%'}}>Assign Resource</h2>
                <div className="float-right">
                        <select name="rtype"
                            className="browser-default custom-select" value={this.state.rtype}
                                 placeholder="Select status"
                                 onChange={this.handleChange}>
                              <option value='EMS'>EMS</option>
                              <option value='Fire'>Fire</option>
                              <option value='Hazmat'>Hazmat</option> 
                              <option value='Utilities'>Utilities</option>
                              <option value='Person'>Person</option>
                        </select>
                  </div> 
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table  id='resources'>
            <tbody>
                  <tr>
                    <th>SELECT</th>
                      {this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
            </div>
                <Button style={{margin:'5%',width:'10%'}}>Assign</Button>
            </div>   
        </div>
       );
}

}
    
    