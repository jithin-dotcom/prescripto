
import { specialityData } from '../assets/assets1'
import { useNavigate } from 'react-router-dom'

const SpecialityMenu = () => {
    const navigate = useNavigate();
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
            <h1 className='text-3xl font-medium'> Specialties That We Offer</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
                {specialityData.map((item, index) => (
                    <div onClick={() => navigate("/all-doctors")} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="" />
                        <p>{item.speciality}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu