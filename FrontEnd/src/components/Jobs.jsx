import Navbar from './shared/Navbar'
import FilterPage from './FilterPage'
import Job from './Job'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

// const Jobsarray=[1,2,3,4,5,6,7,8]
const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.salary.toString().includes(searchedQuery);
      });
      setFilterJobs(filteredJobs)
    }
    else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

  return (
    <div>
      <Navbar />

      <div className='max-w-7xl mx-auto mt-5'>

        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterPage />
          </div>
          {
            filterJobs.length <= 0 ? <span>Job Not Found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterJobs.map((job) => {
                     return <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}
                      >
                        <Job job={job} />
                      </motion.div>

                    })
                  }
                </div>
              </div>
            )

          }
        </div>

      </div>

    </div>
  )
}

export default Jobs

// flex - 1 matlab baki bacha kacha ye lel elga
