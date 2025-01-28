import { NavLink } from 'react-router-dom';
import classes from '../../resources/css/components/projects/project.module.css';;

import projectsContent from './projectsContent';

function Project () {

    return (
        projectsContent.map((project, index) => {
            return (
                <NavLink className={classes.project}
                to={project.navLink}
                key={`project_${index}`}>
                    <video
                    aria-label={project.altText}
                    autoPlay
                    loop
                    muted>
                        <source src={project.videoSrc} type='video/mp4'/>
                        Video not showing..
                    </video>
                    <div className={classes.text}>
                        <div className={classes.backgroundH2}>
                            <h2>
                                {project.header}
                            </h2>
                        </div>
                        <div className={classes.backgroundP}>
                            <p>
                                {project.hoverText}
                            </p>
                        </div>
                    </div>
                </NavLink>
            );
        })
    );
}

export default Project;