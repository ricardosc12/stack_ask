import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './api.js'
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);

const Box = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  position: absolute;
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
  bottom: -5px;
  right: 0px;

  &::before{
    content: '${props => props.num}';
    width: 100px;
    font-size: 10px;
    display: flex;
    position: absolute;
    justify-content: flex-end;
    align-items: center;
    /* background: red; */
    left: -105px;
  }
`;


const ImageBox = styled.div`
    cursor: pointer;
    display: flex;
    position: relative;
    margin-left: 15px;
    margin-bottom: 15px;
    width: 100px;
    height: 100px;
    color: white;
    background-image: url(${props => props.flag});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 70px;
`;

class Country extends React.Component {

  clickChild = () => {
    this.props.clicked(this.props.name)
  }

  render() {  
      return (  
        <Box onClick={this.clickChild} className="content">
          <ImageBox flag={this.props.flag}>
            <Icon num={this.props.num}><FontAwesomeIcon icon="user"/></Icon>
          </ImageBox>
        </Box>  
        
      );

  }
}

  class Lista extends React.Component {

    constructor(props) {
        super(props)
        this.state = {lista:[]}
    }

    componentDidMount(){
      let lista_temp = []
      console.log("Iniciando requisição !")
      fetch("https://restcountries.eu/rest/v2/all")
        .then(resp => resp.json())
        .then((json_data)=>{
          for(var i=0;i<json_data.length;i++){
            var population = (json_data[i].population).toLocaleString(undefined,{minimumFractionDigits: 0})
            lista_temp.push({flag:json_data[i].flag,name:json_data[i].translations.br,num:population})
          }
            this.setState({lista:lista_temp})
            console.log("Concluído !")
        });
    }

    click(name){
      window.open('https://pt.wikipedia.org/wiki/'+name,"_blank")
    }

    render() {  
        return (
            <div className="lista">
              {this.state.lista.map((tile,index) => (
                <Country key={index} flag={tile.flag} name={tile.name} num={tile.num} clicked={this.click}/>
              ))}
          </div>            
            
        );

    }
  }



  class Container extends React.Component {



    render() {  
        return (
            <div className="container">
              <div className="main_contant">
                <Lista/>
              </div>
            </div>
        );

    }
  }

  class Main extends React.Component {

    render() {
      return (
            <Container/>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
   