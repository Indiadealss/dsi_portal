import React from 'react'
import JwalaPrasadDubey from '../Images/JwalaPrasadDubey.jpg';
import Keshav from '../Images/keshav-bhaiu.jpg'
import Aanand from '../Images/Ananad.jpg'

const Itteam = () => {
    const teamData = [
        {
            id: 1,
            name: "Jwala Prasad Dubey",
            role: "IT Head",
            image: JwalaPrasadDubey,
            linkedin: "#"
        },
        {
            id: 3,
            name: "Aanand Singh",
            role: "Graphics Designer",
            image: Aanand,
            linkedin: "#"
        },
        {
            id: 4,
            name: "Keshav Yadav",
            role: "Full Stack Devloper (IT)",
            image: Keshav,
            linkedin: "#"
        }
    ];
  return (
    <div>


        <div className='mx-auto'>
                        <h1 className='text-center mt-10 font-bold text-[#313036] text-xl text-4xl uppercase'>IT Team</h1>
                        <div className='mx-auto w-10 border mt-3'></div>
                    </div>


                    <section className="p-0 m-0 md:py-20 md:px-20">
                                            <div className="md:flex md:flex-wrap justify-center gap-6">
                    
                                                {teamData.map((member) => (
                    
                                                    <div
                                                        key={member.id}
                                                        className="bg-white rounded-xl shadow-md mx-auto my-4  relative w-[80%] md:w-[23%]"
                                                    >
                    
                                                        <div className="relative w-full h-[440px] md:h-[360px] 2xl:h-[500px]">
                                                            <img
                                                                src={member.image}
                                                                alt={member.name}
                                                                fill
                                                                className="object-contain rounded-xl"
                                                            />
                                                        </div>
                    
                                                        <div className="bg-gray-500/30 backdrop-blur-md shadow rounded-lg px-4 py-3 flex justify-between items-center absolute bottom-6 left-6 right-6">
                    
                                                            <div>
                                                                <h3 className="font-semibold text-white text-sm">
                                                                    {member.name}
                                                                </h3>
                                                                <p className="text-xs text-white">
                                                                    {member.role}
                                                                </p>
                                                            </div>
                    
                                                        </div>
                    
                                                    </div>
                    
                                                ))}
                    
                                            </div>
                                        </section>
    </div>
  )
}

export default Itteam
