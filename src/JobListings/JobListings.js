import React, { useState } from 'react';
import JobsData from './data.json';
import './JobListings.css';

function JobListings() {

    const [selectedTags, setSelectedTags] = useState([]);

    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    }

    const addTag = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.concat([tag]));
        }
    }

    const jobMatchesTag = (job, tag) => [job.tools, job.languages, [job.role], [job.level]].some(field => field.includes(tag))

    const filterJobsByTags = (jobs, tags) => tags.length === 0 ? jobs : jobs.filter(j => tags.every(t => jobMatchesTag(j, t)))

    return (
        <div className="job-page">
            <div className="header"></div>

            <div className="content">
                <div className="filter-bar">
                    <div className="filter-tags">
                        {
                            selectedTags.map(tag =>
                                <TagButton tag={tag} removeTag={removeTag} key={tag} />
                            )
                        }

                    </div>
                    <div
                        className="clear-button"
                        onClick={(e) => setSelectedTags([])}
                    >
                        Clear
                    </div>
                </div>
                <div className="job-list">
                    {
                        filterJobsByTags(JobsData, selectedTags).map(job =>
                            <JobCard
                                job={job}
                                addTag={addTag}
                                key={job.id}
                            />
                        )
                    }
                </div>
                <Footer />
            </div>
        </div>
    )
}

function JobCard({ job, addTag }) {
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
                    {[job.role, job.level, ...job.tools, ...job.languages].map(t =>
                        <Tag tag={t} addTag={addTag} key={t} />
                    )}
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

function Tag({ tag, addTag }) {
    return (
        <span
            className='tag'
            onClick={(ev) => addTag(tag)}
        >
            {tag}

        </span>
    )

}
function TagButton({ tag, removeTag }) {
    return (
        <span className='tag-button'>
            <span className='foo'>{tag}</span>
            <img
                onClick={(ev) => removeTag(tag)}
                className="remove-icon"
                src="/images/icon-remove.svg"
                alt="remove tag"
            />
        </span>
    )

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