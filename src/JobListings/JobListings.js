import React from 'react';
import JobsData from './data.json';
import './JobListings.css';

function JobListings() {
    return (
        <>
            <div className="header"></div>
            <div className="content">
                <div className="job-list">
                    {
                        JobsData.map(job =>
                            <JobCard job={job} key={job.id} />
                        )
                    }
                </div>
                <Footer />
            </div>
        </>
    )
}

function JobCard({ job }) {
    return (
        <div className={"job " + (job.featured ? "job-featured" : "")}  >
            <div className="main-detail">
                <div className="left-block">
                    <div className="image-slot">
                        <img src={prepImgPath(job.logo)} alt={job.company} />
                    </div>
                    <div className="vblock">
                        <div className="top-line">
                            <span className="company">{job.company}</span>
                            {job.new ? <span className="pill new">NEW!</span> : ""}
                            {job.featured ? <span className="pill featured">FEATURED</span> : ""}
                        </div>
                        <div className="position">{job.position}</div>
                        <div className="extra-detail-list">
                            <span className="extra-detail posted-at">{job.postedAt}</span>
                            <span className="extra-detail contract">{job.contract}</span>
                            <span className="extra-detail location">{job.location}</span>
                        </div>
                    </div>

                </div>
                <div className="tags">
                    {[job.role, job.level, ...job.tools, ...job.languages].map(t => <Tag tag={t} key={t} />)}
                </div>

            </div>

        </div>
    );
}
function Footer() {
    return (
        <footer>
            <div className="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>
            </div>
            [<a href="/challenge/">Challenge</a>]
            [<a href="http://localhost:3000/challenge/design/desktop-design.jpg">Desktop Design image</a>]
        </footer>
    );
}

function Tag({ tag }) {
    return <span className='tag'>{tag}</span>

}
function prepImgPath(path) {
    return path.replace(/^\./, "");
}

export default JobListings;

/*

{
    "id": 3,
    "company": "Account",
    "logo": "./images/account.svg",
    "new": true,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  },

*/