import jobsData from '../data/jobs.json'
import { playerJobsInfoStore } from '@/stores/playerJobsInfo'

export default class PlayerJobs {
  constructor () {
    this.jobs = jobsData

    const playerJobsInfo = playerJobsInfoStore()

    this.laborerExperience = playerJobsInfo.playerLaborerExperience
    this.laborerMaxExperience = playerJobsInfo.playerLaborerMaxExperience
    this.laborerRank = playerJobsInfo.playerLaborerRank
    this.streetSweeperExperience = playerJobsInfo.playerStreetSweeperExperience
    this.streetSweeperMaxExperience = playerJobsInfo.playerStreetSweeperMaxExperience
    this.streetSweeperRank = playerJobsInfo.playerStreetSweeperRank
    this.vendorExperience = playerJobsInfo.playerVendorExperience
    this.vendorMaxExperience = playerJobsInfo.playerVendorMaxExperience
    this.vendorRank = playerJobsInfo.playerVendorRank
  }

  getCurrentJobRank (jobId) {
    if (jobId === 1) {
      return this.laborerRank
    } else if (jobId === 2) {
      return this.streetSweeperRank
    } else if (jobId === 3) {
      return this.vendorRank
    }
  }
}

//   getJobById(id) {
//     return this.jobs.find(job => job.id === id)
//   }

//   getJobs() {
//     return this.jobs
//   }

//   getJobsByLevel(level) {
//     return this.jobs.filter(job => job.level === level)
//   }

//   getJobsByType(type) {
//     return this.jobs.filter(job => job.type === type)
//   }

//   getJobsByTypeAndLevel(type, level) {
//     return this.jobs.filter(job => job.type === type && job.level === level)
//   }
// }