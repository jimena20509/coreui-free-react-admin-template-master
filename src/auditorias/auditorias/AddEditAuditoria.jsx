import { useEffect,useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useFirestore } from 'reactfire';
import  Select  from "react-select";

const schema = yup.object().shape({
    id: yup.string(),
    fecha: yup.string().required('Es requerido'),
    activo: yup.boolean(),
    iglesia_id: yup.string(),
    iglesia: yup.object().shape({
        id: yup.string(),
        nombre: yup.string(),
        direccion: yup.string(),
        telefono: yup.string(),
    }),
    actual: yup.boolean(),
    createAt: yup.date().default(function () {
        return new Date();
    }),
  });


const AddEditAuditoria = ({history})=> {

    
    const refFire = useFirestore();
    const [iglesias, setIglesias] = useState([])


    const { register, handleSubmit,control, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const crear = async (datos) => {
        console.log(datos)
        await refFire.collection('auditorias').doc().set(datos)
        toast('Auditoria Creada.')
        history.push('/auditorias')

    }

    const onSubmit = (datos)=> {
        crear(datos)
    }

    const onCancelar = ()=> {
        history.push('/auditorias')
    }

    useEffect(() => {
        const traerDatos = async () => {
            const temporales = []
            const snapshot = await refFire.collection('iglesias').get()
            snapshot.docs.forEach((doc)=>{
                const elem = {
                    id: doc.id,
                    ...doc.data(),
                    value: doc.id,
                    label: doc.data().nombre
                }
                temporales.push(elem)
            })
            setIglesias(temporales)
        }

        traerDatos()

    }, [refFire])

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="input-gruop">
                            
                        <label>Fecha</label>
                        <input className="form-control" type="date" {...register('fecha')} />
                        { errors.nombre?.message}
                    </div>
                    <div className="input-gruop">
                            
                        <label>Activo</label>
                        <input value="0" type="radio"  {...register('activo')} />
                        <label>Inactivo</label>
                        <input value="1" type="radio"  {...register('activo')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Actual</label>
                        <input value="0" type="radio"  {...register('actual')} />
                        <label>No actual</label>
                        <input value="1" type="radio"  {...register('actual')} />
                    </div>
                    <Controller
                        name="iglesia"
                        control={control}
                        render={({field}) => <Select
                        {...field}
                        options={iglesias}
                        />}
                    />

                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default AddEditAuditoria