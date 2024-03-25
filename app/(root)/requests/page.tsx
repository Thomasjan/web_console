"use client";
import Header from '@/components/shared/Header'
import { useToast } from '@/components/ui/use-toast';
import React from 'react'

import { IoReload } from "react-icons/io5";

const Requests = () => {

  const { toast } = useToast()

  const reloadScriptCreateJobs =  () => {
    try{
      fetch('http://localhost:3000/api/v1/scripts/startCreateJobs')

      toast({
        title: 'Script de création redémarré',
        description: 'Le script de création a été redémarré avec succès',
        duration: 5000,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const reloadScriptGetJobs =  () => {
    try{
      fetch('http://localhost:3000/api/v1/scripts/startGetJobs')
      toast({
        title: 'Script de récupération redémarré',
        description: 'Le script de récupération a été redémarré avec succès',
        duration: 5000,
      })

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Header title="Requêtes" subtitle="Déclenchement des requêtes" />
      <div className='mt-8 bg-blue-200 rounded-md p-6 w-[600px] flex flex-col gap-6'>
        <div className='item-center flex gap-4'>
          <span>Redémarrer le script d&apos;envoi des Missions</span>
          <IoReload size={26} className='text-4xl cursor-pointer hover:text-green-600' onClick={()=> reloadScriptCreateJobs()} />
        </div>
        <div className='item-center flex gap-4'>
          <span>Redémarrer le script de récupération des Missions</span>
          <IoReload size={26} className='text-4xl cursor-pointer hover:text-green-600' onClick={()=> reloadScriptGetJobs()} />
        </div>
      </div>
    </div>
  )
}

export default Requests