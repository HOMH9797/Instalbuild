import React,{Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state ={
        typeApartment:'',
        apartmentNumber:'',
        areaMt:'',
        priceMt:'',
        pricetotalMt:'',
        construccion: [],
        _id:''
        }
        this.addConstruccion= this.addConstruccion.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }   
    deleteConstruccion(id){
        // this.setState({construccion: data});
        // console.log('deleting', id);
        if(confirm('Esta seguro de eliminarlo?'))
        {
            fetch(`/api/construccion/${id}`,
            {
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(res=>res.json())
            .then(data=> {console.log('');
                M.toast({html: 'Construccion deleted'});
                this.fetchConstruccion();
            });
        }
    }
    addConstruccion(e){
        console.log(this.state)
       if(this.state._id){
           let s = JSON.stringify({
                typeApartment: this.state.typeApartment,
                apartmentNumber: this.state.apartmentNumber,
                areaMt: this.state.areaMt,
                priceMt: this.state.priceMt
            })
            console.log(s);
            fetch(`/api/construccion/${this.state._id}`,{
                method:'PUT',
                body: JSON.stringify({
                    typeApartment: this.state.typeApartment,
                    apartmentNumber: this.state.apartmentNumber,
                    areaMt: this.state.areaMt,
                    priceMt: this.state.priceMt
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                M.toast({html:'Construccion update'});
                this.setState({typeApartment: '',apartmentNumber: '',  areaMt:'',priceMt:'',_id:''});
                this.fetchConstruccion();
            })
       }else{
            fetch('/api/construccion',{
                method:'POST',
                body: JSON.stringify({
                    typeApartment: this.state.typeApartment,
                    apartmentNumber: this.state.apartmentNumber,
                    areaMt: this.state.areaMt,
                    priceMt: this.state.priceMt
                }),
                headers:{
                'Accept':'application/json' ,
                'Content-Type': 'application/json'
                }
            })
            .then(res => console.log(res))
            .then(data => {
                M.toast({html: 'construccion saved'})
                this.setState({typeApartment: '',apartmentNumber:'',  areaMt:'',priceMt:''});
                this.fetchConstruccion();
            }).catch(err => console.error(err));
       }

        e.preventDefault();
    }
    componentDidMount(){
        this.fetchConstruccion()
    }
    fetchConstruccion(e){
        fetch('/api/construccion')
            .then(res =>    res.json())
            .then(data => {this.setState({construccion: data})});
    }
    handleChange(e){
        const {name, value}= e.target;
        this.setState({
            [name]: value
        });
    }
    editConstruccion(id){
        fetch(`/api/construccion/${id}`)
            .then(res =>res.json())
            .then(data => {console.log(data)
                this.setState({
                    typeApartment: data.typeApartment,
                    apartmentNumber: data.apartmentNumber,
                    areaMt: data.areaMt,
                    priceMt: data.priceMt,
                    pricetotalMt: data.pricetotalMt,
                    _id: data._id
                })
            });
    }
    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Construction project</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card" >
                                <div className="card-content" >
                                    <form onSubmit={this.addConstruccion}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                 <input name="typeApartment" 
                                                        onChange={this.handleChange} 
                                                        type="text" 
                                                        placeholder="Tipo"
                                                        value={this.state.typeApartment}/>    
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                 <input name="apartmentNumber" 
                                                        onChange={this.handleChange} 
                                                        type="number" 
                                                        placeholder="Referencia"
                                                        value={this.state.apartmentNumber}/>    
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                 <input name="areaMt" 
                                                        onChange={this.handleChange} 
                                                        type="number" 
                                                        placeholder="Area"
                                                        value={this.state.areaMt}/>    
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                 <input name="priceMt" 
                                                        onChange={this.handleChange} 
                                                        type="number" 
                                                        placeholder="Precio mt"
                                                        value={this.state.priceMt}/>    
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn light-blue darken-4">Agregar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Referencia</th>
                                        <th>Area</th>
                                        <th>Precio mt</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.construccion.map(cosntru =>{
                                            return(
                                                <tr key={cosntru._id}>
                                                    <td>{cosntru.typeApartment}</td>
                                                    <td>{cosntru.apartmentNumber}</td>
                                                    <td>{cosntru.areaMt}</td>
                                                    <td>{cosntru.priceMt}</td>
                                                    <td>{cosntru.pricetotalMt}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={()=> this.deleteConstruccion(cosntru._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={()=> this.editConstruccion(cosntru._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;