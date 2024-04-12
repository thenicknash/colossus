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

  getJobRank (jobId) {
    if (jobId === 1) {
      return this.laborerRank
    } else if (jobId === 2) {
      return this.streetSweeperRank
    } else if (jobId === 3) {
      return this.vendorRank
    }
  }

  getJobExperience (jobId) {
    if (jobId === 1) {
      return this.laborerExperience
    } else if (jobId === 2) {
      return this.streetSweeperExperience
    } else if (jobId === 3) {
      return this.vendorExperience
    }
  }

  getJobMaxExperience (jobId) {
    if (jobId === 1) {
      return this.laborerMaxExperience
    } else if (jobId === 2) {
      return this.streetSweeperMaxExperience
    } else if (jobId === 3) {
      return this.vendorMaxExperience
    }
  }

  increaseJobExperience (jobId, experience) {
    if (jobId === 1) {
      this.laborerExperience += experience
      if (this.laborerExperience >= this.laborerMaxExperience) {
        this.laborerExperience = 0
        this.laborerMaxExperience += 10
        this.laborerRank++
      }
    } else if (jobId === 2) {
      this.streetSweeperExperience += experience
      if (this.streetSweeperExperience >= this.streetSweeperMaxExperience) {
        this.streetSweeperExperience = 0
        this.streetSweeperMaxExperience += 10
        this.streetSweeperRank++
      }
    } else if (jobId === 3) {
      this.vendorExperience += experience
      if (this.vendorExperience >= this.vendorMaxExperience) {
        this.vendorExperience = 0
        this.vendorMaxExperience += 10
        this.vendorRank++
      }
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