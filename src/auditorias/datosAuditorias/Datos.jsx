import { useEffect, useState} from 'react';
import { useFirestore } from 'reactfire';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

const DatosAuditorias = ({history}) => {


    const refFire = useFirestore()

    const [auditorias, setAuditorias] = useState([]);
    const [auditoriaActual, setAuditoriaActual] = useState();
    const [libMensuales, setLibMensuales] = useState([]);
    const [datosNewLibroMes, setDatosNewLibroMes] = useState({});

    useEffect(() =>{
        const traerDatos = async () => {

            //Traer auditorias y la actual 
            const auditoriasFix = []
            const auditoriasTemp = await refFire.collection('auditorias').get()
            let auditTemp = {}
            
            auditoriasTemp.forEach(snapshot => {
                auditTemp = snapshot.data()
                auditoriasFix.push({...snapshot.data(), id: snapshot.id})

                if(auditTemp.actual = true){
                    setAuditoriaActual (auditTemp)
                    //Traer libros de las auditorias actuales 

                    //const lib_mensuales = await refFire.collection('lib_mensuales').where('auditoria_id', '=', auditTemp.id).get()
                    //setLibMensuales(lib_mensuales)//
                }
            })

            setAuditorias(auditoriasFix)

            
        }

        traerDatos()

    }, [refFire])

    const handlerDatosLibroMes = (e) => {
        const { name } = e.target
        setDatosNewLibroMes( (datos) => {
            return {
                ...datos,
                [name]: e.target.value
            }
        })
    }

    const crearLibroMes = async () => {
        console.log('Guardado')
        const res  = await refFire.collection('lib_mensuales').doc().set(datosNewLibroMes)
        console.log(res)
    }

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Auditoria </h4>

                    <div>
                        {
                            auditorias &&
                            auditorias.map((audit)=> {
                                return (
                                    <button  key={audit.id} className="btn btn-primary">
                                        {audit.fecha}
                                    </button>

                                    )
                                })
                        }
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Libros del mes </h4>

                    <select onChange={ (e) => handlerDatosLibroMes(e)} name="anioLibroMes" multiple style={{padding: 5, margin: 5, borderRadius: 5}}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>


                    <select onChange={ (e) => handlerDatosLibroMes(e)} name="mesLibroMes" multiple style={{padding: 5, margin: 5, borderRadius: 5}}>
                        <option value="Enero">Enero</option>
                        <option value="Febrero">Febrero</option>
                        <option value="Marzo">Marzo</option>
                        <option value="Abril">Abril</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Junio">Junio</option>
                        <option value="Julio">Julio</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Septiembre">Septiembre</option>
                        <option value="Octubre">Octubre</option>
                        <option value="Noviembre">Noviembre</option>
                        <option value="Diciembre">Diciembre</option>
                    </select>

                    <button className="btn btn-primary" onClick ={() => crearLibroMes()}>
                        <FaPlus />
                    </button>

                    <div>
                        {
                            libMensuales &&
                            libMensuales.map((libMensual)=> {
                                return (
                                    <div key={libMensual.id} className="btn btn-info">
                                        {libMensual.fecha}
                                    </div>

                                    )
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatosAuditorias