import classes from '../../resources/css/components/projects/projects.module.css';

import projectsContent from './projectsContent';

import Project from './Project';

function Projects() {

    return (
        <div className={classes.projects}>
            <h1>
                Projects
            </h1>
            <div className={classes.projectsContainer}>
                <Project/>
            </div>
        </div>
    );
}

export default Projects;