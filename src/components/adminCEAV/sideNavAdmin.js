
import React,{Component} from 'react'
import { Layout,Menu } from 'antd';
import { DesktopOutlined,UsergroupAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import {API} from '../Graphql/Graphql'
import TablaArea from './signUpCatAreas'
import TablaOficina from './signUpCatOficinas'
import TablaPersonal from './signUpCatPersonal'
// import TablaPuesto from './signUpCatPuesto'
import TablaPuestos from './signUpCatPuesto'
import TablaRoles from './signUpCatRoles'
import TablaEmpleado from './signUpEmpleado'
import TablaChangepass from './changePassword';
import TablaDirectorio from './tablaDataEmpleados'
// import
import { FcGoogle } from "react-icons/fc";
import { MDBIcon } from 'mdbreact'
import { GrGroup } from "react-icons/gr";
import { MenuUnfoldOutlined,MenuFoldOutlined ,SolutionOutlined,IdcardOutlined,BankOutlined } from '@ant-design/icons';
import './sideNavAdmin.css'
import imagenCEAV from '../imagen/CEAVlogo.png'
import tablaDataEmpleado from './tablaDataEmpleados';

class sideNavAdmin extends Component{
    constructor(props){
        super(props)
        this.state={     
            sideNavTablaDirectorio:true, 
            sideNavArea:false,
            sideNavOficinas:false,
            sideNavPersonal:false,
            sideNavPuesto:false,
            sideNavRoles:false,
            sideNavEmpleados:false,
            sideNavChangePass:false,
            sideNavTablaDirectorio:true,
            collapsed:false, 
            tablaArea:[],
            tablaOficina:[],
            tablaPersonal:[],
            tablaPuesto:[],
            tablaEmpleados:[],
            tablaDataEmpleados:[]
           
        }
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };

      sideNavTablaDirectorio(){
        this.setState({sideNavTablaDirectorio:true})
        this.setState({sideNavArea:false})
        this.setState({sideNavOficinas:false})
        this.setState({sideNavPersonal:false})
        this.setState({sideNavPuesto:false})
        this.setState({sideNavRoles:false})
        this.setState({sideNavEmpleados:false})  
        this.setState({sideNavChangePass:false})

      }       
      sideNavArea(){
        this.setState({sideNavTablaDirectorio:false})
        this.setState({sideNavArea:true})
        this.setState({sideNavOficinas:false})
        this.setState({sideNavPersonal:false})
        this.setState({sideNavPuesto:false})
        this.setState({sideNavRoles:false})
        this.setState({sideNavEmpleados:false})  
        this.setState({sideNavChangePass:false}) 
      }
      sideNavOficinas(){
        this.setState({sideNavTablaDirectorio:false})
        this.setState({sideNavArea:false})
        this.setState({sideNavOficinas:true})
        this.setState({sideNavPersonal:false})
        this.setState({sideNavPuesto:false})
        this.setState({sideNavRoles:false})
        this.setState({sideNavEmpleados:false})  
        this.setState({sideNavChangePass:false}) 
      }
      sideNavPersonal(){
        this.setState({sideNavTablaDirectorio:false})
        this.setState({sideNavArea:false})
        this.setState({sideNavOficinas:false})
        this.setState({sideNavPersonal:true})
        this.setState({sideNavPuesto:false})
        this.setState({sideNavRoles:false})
        this.setState({sideNavEmpleados:false})  
        this.setState({sideNavChangePass:false})       
      }
      sideNavPuesto(){
        this.setState({sideNavTablaDirectorio:false})
        this.setState({sideNavArea:false})
        this.setState({sideNavOficinas:false})
        this.setState({sideNavPersonal:false})
        this.setState({sideNavPuesto:true})
        this.setState({sideNavRoles:false})
        this.setState({sideNavEmpleados:false})  
        this.setState({sideNavChangePass:false})   
      }
      sideNavRoles(){
        this.setState({sideNavTablaDirectorio:false})
        this.setState({sideNavArea:false})
        this.setState({sideNavOficinas:false})
        this.setState({sideNavPersonal:false})
        this.setState({sideNavPuesto:false})
        this.setState({sideNavRoles:true})
        this.setState({sideNavEmpleados:false})  
        this.setState({sideNavChangePass:false})     
      }
      sideNavEmpleados(){
        this.setState({sideNavTablaDirectorio:false})
        this.setState({sideNavArea:false})
        this.setState({sideNavOficinas:false})
        this.setState({sideNavPersonal:false})
        this.setState({sideNavPuesto:false})
        this.setState({sideNavRoles:false})
        this.setState({sideNavEmpleados:true})  
        this.setState({sideNavChangePass:false})   
      }
      sideNavChangePass(){
        this.setState({sideNavTablaDirectorio:false})
        this.setState({sideNavArea:false})
        this.setState({sideNavOficinas:false})
        this.setState({sideNavPersonal:false})
        this.setState({sideNavPuesto:false})
        this.setState({sideNavRoles:false})
        this.setState({sideNavEmpleados:false})  
        this.setState({sideNavChangePass:true})
      }


      cerrar(){
        this.props.history.push("/")
      }
    render(){
        const { Header, Footer, Sider, Content } = Layout;

        let tablaArea;
        let tablaOficina;
        let tablaPersonal;
        let tablaPuesto;
        let tablaRoles;
        let tablaEmpleados;
        let tablaChangePass;
        let tablaDataEmpleado

         if(this.state.sideNavArea ===true){
            tablaArea= 
            <div>
           <TablaArea/>
           </div>
         }
         if(this.state.sideNavOficinas === true){
            tablaOficina=
            <div>
             <TablaOficina/>
             </div>
        }
        if(this.state.sideNavPersonal === true){
            tablaPersonal=
            <div>
            <TablaPersonal/>
            </div>
        }
        if(this.state.sideNavPuesto === true){
            tablaPuesto=
            <div>
            <TablaPuestos/>
            </div>

        }
        if(this.state.sideNavRoles === true){
            tablaRoles=
            <div>
            <TablaRoles/>
            </div>
        }
        if(this.state.sideNavEmpleados === true){
            tablaEmpleados=
            <div>
            <TablaEmpleado/>
            </div>
        }
         if(this.state.sideNavChangePass === true){
           tablaChangePass=
           <div>
             <TablaChangepass/>
           </div>
         }
         if(this.state.sideNavTablaDirectorio === true){
           tablaDataEmpleado=
           <div>
             <TablaDirectorio/>
           </div>
         }
 

        let menu=
        <div>
        <Menu theme="light" mode="inline" className='ant-menu1' defaultSelectedKeys={['1']}>       
        <Menu.Item key="1" onClick={e=>this.sideNavArea()} icon={<MDBIcon icon="chalkboard-teacher" style={{ fontSize: '20px', color:'#000' }}/>}>           
            Area              
        </Menu.Item>
        <Menu.Item key="2"  onClick={e=>this.sideNavOficinas()} icon={<MDBIcon far icon="building" style={{ fontSize: '20px', color: '#000' }}/>} >           
          Oficinas              
        </Menu.Item>
        <Menu.Item key="3"  onClick={e=>this.sideNavPersonal()} icon={<MDBIcon icon="users-cog" style={{ fontSize: '20px', color: '#000' }} />}>           
            Personal              
        </Menu.Item>
        <Menu.Item key="4"  onClick={e=>this.sideNavPuesto()}  icon={<IdcardOutlined  style={{ fontSize: '25px', color: '#000' }} />}>           
            Puesto              
        </Menu.Item>
        <Menu.Item key="5" onClick={e=>this.sideNavRoles()}  icon={<UsergroupAddOutlined style={{ fontSize: '25px', color: '#000' }} />}>           
            Roles              
        </Menu.Item>
        <Menu.Item key="6"  onClick={e=>this.sideNavEmpleados()} icon={<SolutionOutlined style={{ fontSize: '25px', color: '#000' }} />}>           
         Usuarios              
        </Menu.Item>
        <Menu.Item key="7"  onClick={e=>this.sideNavChangePass()} icon={<MDBIcon icon="key"  style={{ fontSize: '20px', color: '#000' }} />}>           
         restablecer contraseña              
        </Menu.Item>
        <Menu.Item key="8"  onClick={e=>this.sideNavTablaDirectorio()} icon={<MDBIcon icon="pencil-alt" style={{ fontSize: '20px', color: '#000' }} />}>           
         Edita Directorio              
        </Menu.Item>
        <Menu.Item key="9" onClick={e=>this.cerrar()} icon={<MDBIcon icon="door-open" style={{ fontSize: '20px', color: '#000' }} />}>           
          Cerrar Sesión            
        </Menu.Item>
        </Menu>
        </div>
        return(
            <React.Fragment> 
                <Layout>     
                <Sider trigger={null} className="site-layout-background" collapsible collapsed={this.state.collapsed}>  
                <center> 
                    <a>
                    <img src={imagenCEAV} style={{width:"70%",marginTop:"3%"}} />
                    </a>
                    </center> 
                    <br></br>
                    {menu}
                </Sider>
                <Layout className="site-layout" >       
                    <Header className="site-layout-background1"  >   
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggle,              
                    }) } 
                    </Header>         
                        {tablaArea}
                        {tablaOficina}
                        {tablaPersonal}
                        {tablaPuesto}
                        {tablaRoles}
                        {tablaEmpleados}
                        {tablaChangePass}
                        {tablaDataEmpleado}
                </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }} className="piePag">
                <FcGoogle />&nbsp;<a href="https://www.gob.mx/ceav">https://www.gob.mx/ceav</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBIcon far icon="envelope" />&nbsp;<a href="comunicacionsocial@ceav.gob.mx">comunicacionsocial@ceav.gob.mx</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBIcon fab icon="twitter" /><a href="@CEAVmex"> @CEAVmex</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBIcon fab icon="facebook" /><a href="https://www.facebook.com/CEAVmex"> @CEAVmex</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDBIcon fab icon="instagram" /><a href="https://www.instagram.com/ceav_cs"> @ceav_cs</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
                </Footer>
                
            </React.Fragment>
        )
        }
}export default sideNavAdmin