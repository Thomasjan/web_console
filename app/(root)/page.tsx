"use client";
import Header from '@/components/shared/Header'
import React, { useEffect, useState } from 'react'
import { GrStatusWarning, GrStatusGood } from "react-icons/gr";

const Home = () => {

  const [status, setStatus] = useState(false)
  const [apiStatusLoading, setApiStatusLoading] = useState(false)
  const [connexionKazeERPLoading, setConnexionKazeERPLoading] = useState(false)

  useEffect(() => {
    testAPIStatus()
    testConnexionKazeERP()
  }, [])

  const testAPIStatus = async () => {
    setApiStatusLoading(true)
    //wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      console.log(process.env.KAZE_API_URL)
      const response = await fetch(process.env.KAZE_API_URL || 'http://localhost:3000/')
      const data = await response.json()
      if(data.status === 'ok') setStatus(true)
      else setStatus(false)
    } catch (error) {
      console.error('Error:', error)
      setStatus(false)
    }
    setApiStatusLoading(false)
  }

  const testConnexionKazeERP = async () => {
    setConnexionKazeERPLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const response = await fetch(`${process.env.KAZE_API_URL}/connexionERP`)
      const data = await response.json()
      if(data.status === 'ok') setStatus(true)
      else setStatus(false)
    } catch (error) {
      console.error('Error:', error)
      setStatus(false)
    }
    setConnexionKazeERPLoading(false)
  }


  return (
    <div>
      <Header title="Accueil" subtitle="Console d'administration ERP - KAZE" />
      <div className=' mt-8 w-full bg-blue-100 h-96 rounded-md shadow-xl p-6 flex flex-col gap-8'>
        <div className='flex items-center'>
        <button onClick={testAPIStatus} className='mr-4 bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-100'>Tester</button>
         <h2 className='font-bold'>Status de la connexion à l'API:</h2>
          {apiStatusLoading && <div className='ml-4 font-semibold italic'> Chargement... </div>}
          {status && !apiStatusLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
          {!status && !apiStatusLoading && <GrStatusWarning size={26} className='ml-4 text-red-500' />}
        
        {/* button to test connextion  */}
        </div>

        {/* si connexion ERP est établie, afficher le status de la connexion entre Kaze et l'ERP */}
        <div className='flex items-center'>
        <button onClick={testConnexionKazeERP} className='mr-4 bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-100'>Tester</button>
         <h2 className='font-bold'>Status de la connexion entre Kaze et l'ERP:</h2>
          {connexionKazeERPLoading && <div className='ml-4 font-semibold italic'> Chargement... </div>}
          {status && !connexionKazeERPLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
          {!status && !connexionKazeERPLoading && <GrStatusWarning size={26} className='ml-4 text-red-500' />}
        
        {/* button to test connextion  */}
        </div>
      </div>
      
      
    </div>
  )
}

export default Home