import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestore } from 'reactfire';
import { toast } from 'react-toastify';


const schema = yup.object().shape({
    nombre: yup.string().required('Es requerido'),
    codigo: yup.string(),
    presidente: yup.string(),
    pais: yup.string(),
  });


    const AddEditDistritos = ({history, match})=> {

    const id = match.params.id;
    const isAddMode = !id;

    const { register, handleSubmit,setValue, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const refFire = useFirestore().collection('distritos');

    const onSubmit =  (datos)=> {
        return isAddMode
        ? crear(datos)
        : actualizar(datos)
    }

    const crear = async (datos) => {
        console.log(datos)
        await refFire.doc().set(datos)
        toast('Unión Creada.')
        history.push('/distritos')

    }

    const actualizar = async (datos) => {
        console.log(datos)
        await refFire.doc(id).set(datos)
        toast('Unión Modificada.')
        history.push('/distritos')

    }

    const onCancelar = ()=> {
        history.push('/distritos')
    }

    useEffect(() => {
        const traerDatos = async ()=> {
            const res = await (await refFire.doc(id).get()).data()
            const fields = ['nombre', 'codigo', 'zona', 'asociación_id', 'pastor', 'tesorero']
            fields.forEach(field => setValue(field, res[field]))
        }

        if (!isAddMode) {
            traerDatos()
        }
    }, [refFire, setValue, isAddMode, id])

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-gruop">
                            
                        <label>Nombre</label>
                        <input className="form-control" {...register('nombre')} />
                        { errors.nombre?.message}
                    </div>
                    <div className="input-gruop">
                            
                        <label>Código</label>
                        <input className="form-control" {...register('codigo')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Zona</label>
                        <input className="form-control" {...register('zona')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Asociación_id</label>
                        <input className="form-control" {...register('asociacion_id')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Pastor</label>
                        <input className="form-control" {...register('pastor')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Tesorero</label>
                        <input className="form-control" {...register('tesorero')} />
                    </div>

                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                </form>
            </div> 
        </div>
    )
}

export default AddEditDistritos