import { useEffect, useState} from 'react';
import { useFirestore } from 'reactfire';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

const DatosAuditorias = ({history}) => {


    const refFire = useFirestore()

    const [auditorias, setAuditorias] = useState([]);
    const [auditoriaActual, setAuditoriaActual] = useState();
    const [libMensuales, setlibMensuales] = useState([]);

    useEffect(() =>{
        const traerDatos = async () => {

            //Traer auditorias y la actual 
            const auditoriasFix = []
            let auditoriaActual = {}
            const auditoriasTemp = await refFire.collection('auditorias').get()
            
            auditoriasTemp.forEach(snapshot => {
                const auditTemp = snapshot.data()
                auditoriasFix.push({...snapshot.data(), id: snapshot.id})
                if(auditTemp.actual = true){
                    setAuditoriaActual (auditTemp)
                }
            })

            setAuditorias(auditoriasFix)

            //Traer libros de las auditorias actuales 

            const lib_mensualesTemp = await refFire.collection('lib_mensuales').get()

            setlibMensuales(libMensuales)
            
        }
        traerDatos()
    }, [refFire])

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
                                    <button key={audit.id} className="btn btn-primary">
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

                    <select multiple style={{padding: 5, margin: 5, borderRadius: 5}}>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                    </select>


                    <select multiple style={{padding: 5, margin: 5, borderRadius: 5}}>
                        <option>Enero</option>
                        <option>Febrero</option>
                        <option>Marzo</option>
                        <option>Abril</option>
                        <option>Mayo</option>
                        <option>Junio</option>
                        <option>Julio</option>
                        <option>Agosto</option>
                        <option>Septiembre</option>
                        <option>Octubre</option>
                        <option>Noviembre</option>
                        <option>Diciembre</option>
                    </select>

                    <button className="btn btn-primary">
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