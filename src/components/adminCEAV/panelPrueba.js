
import React ,{ Component } from 'react'
import { MDBDropdown, MDBDropdownToggle,MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import axios from 'axios'
import {API} from '../Graphql/Graphql';
import { Card,Form as form , Input, Button, Radio } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select,Space,DatePicker } from 'antd';
import swal from 'sweetalert';
import { Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class panel1 extends Component{
    constructor(props){
        super(props)
        this.state={
            valor:'',
            dataEntidad:[],
           
        }
        this.handleChange3 = this.handleChange3.bind(this)        
        
    }
  

    // onChangeInput =(e)=>{
    //     const {id,value} = e.target;
    //     console.log("esto es value",e.target)
    //     this.setState({
    //         [id]:value
    //     })
    //   } 


      handleChange3(value) { 
        this.setState({valor:value}) 
        console.log("esto es valor",value)
        axios({
            url:API,
            method:'post',
            data:{
              query:`
                query{   
                  getEntidad(data:"${[value]}"){
                      nombreEntidad
                      nombreMunicipio               
                    } 
                }
                `  }           
             })
           .then(response => { 
          console.log("Data getEntidad",response.data.data.getEntidad)
              this.setState({dataEntidad:response.data.data.getEntidad}) 
              // console.log("estado",this.state.tablaArea)
            })
            .catch(err=>{
               console.log('error' ,err.response)
            })
    }
    


    // entidad(){
    //     // console.log("esto es valor de entidad",this.state.value)
    //    let valorEntidad= this.state.value
    //     axios({
    //       url:API,
    //       method:'post',
    //       data:{
    //         query:`
    //           query{   
    //             getEntidad(data:"${[valorEntidad]}"){
    //                 nombreEntidad
    //                 nombreMunicipio               
    //               } 
    //           }
    //           `  }           
    //        })
    //      .then(response => { 
    //     console.log("Data getEntidad",response.data.data.getEntidad)
    //         // this.setState({tablaArea:response.data.data.getTablaArea}) 
    //         // console.log("estado",this.state.tablaArea)
    //       })
    //       .catch(err=>{
    //          console.log('error' ,err.response)
    //       })    
  
    //   }

  
 
    render(){


        

        
// if(detalle.acceso === "false"){
//     contactoAsignado = <Form onSubmit={this.onSubmitBtn}>          
//       <select
//          className="browser-default custom-select "
//          type="select"
//          name="contactoSeleccionado"
//          id="contactoSeleccionado"
//          onChange={this.onChangeInput}
//          value={this.state.contactoSeleccionado}
//        >
//          <option value  = "disable" >Seleccione un contacto</option>
//    { this.state.detallesContacto.map(rows=>{
//       return (
//        <option value  = {rows.id_contacto} >{rows.nombre + " " + rows.apellidos}</option>
//       )
//     })}
//     </select>   
//     </Form>
// }

//     acceso = <p style={{color:"#FC0502",marginTop:"2%"}}><strong>Sin acceso al sistema</strong></p>
//     boton2 =  <Button type="primary" onClick={e=>this.enviarAcceso(detalle.id_cliente)}>Enviar acceso</Button> 
//   }else if(detalle.acceso === "true"){
//     acceso = <p style={{color:"#1F8349",marginTop:"2%"}}><strong>Acceso Permitido al sistema</strong></p>
//     boton3 =  <Button type="dashed" danger onClick={e=>this.quitarAcceso(detalle.id_cliente)}>Quitar acceso</Button>   
//   }


        const { Option } = Select;

        let formulario2;
        let formulario=
        <div>
            <form.Item label="ESTADO" required>
            <Select
                onChange={this.handleChange3}
                showSearch
                style={{ width: 400 }}
                placeholder="SELECCIONE SU ESTADO"
                optionFilterProp="children"
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
            >             
            <Option value="1">AGUASCALIENTES</Option>      
            <Option value="2">baja california</Option> 
    
            </Select>   
            {formulario2}
            </form.Item> 
           
        </div>
    //    formulario2=
        //  if(this.state.dataEntidad=''){
            let a = 1;
         formulario2=        
             <div>
             <form.Item label="MUNICIPIO/ALCALDIA" required>
             <Select
                 // onChange={this.handleChange4}
                 showSearch
                 style={{ width: 400 }}
                 placeholder="SELECCIONE SU MUNICIPIO"
                 optionFilterProp="children"
                 filterOption={(input, option) =>
                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                 }
                 filterSort={(optionA, optionB) =>
                 optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                 }
             >               
             {/* <Option value="disable">Seleccione su municipio</Option>       */}
             { this.state.dataEntidad.map(rows=>{
                 console.log("eso es roes de entidad",rows)
      return (
       <option value  = {rows.id_municipio} >{a++}.-&nbsp;{ rows.nombreMunicipio }</option>
      )
    })} 
             </Select>   
             </form.Item> 
             </div>
        //  } else if(this.state.dataEntidad){
        //     formulario2=        
        //         <div>
        //         <form.Item label="MUNICIPIO" required>
        //         <Select
        //             // onChange={this.handleChange4}
        //             showSearch
        //             style={{ width: 400 }}
        //             placeholder="SELECCIONE LA DENOMINACIÓN DEL PUESTO"
        //             optionFilterProp="children"
        //             filterOption={(input, option) =>
        //             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        //             }
        //             filterSort={(optionA, optionB) =>
        //             optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        //             }
        //         >               
        //         <Option value="1">AGUASCALIENTES</Option>      
        //         <Option value="2">baja california</Option>      
        //         </Select>   
        //         </form.Item> 
        //         </div>
        //     }
        //  })



        
        return(
            <React.Fragment>
           {formulario}
           {formulario2}

           
            </React.Fragment>
        )
    }
}export default panel1


     
