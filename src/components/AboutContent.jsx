export default function AboutContent(){
    return(
        <section className="container" id="about">
            <div className="overview">
                <div className="image-box">
                    <img src={require("../images/about-image/department/univ.jpg")} alt="" />
                </div>
                <div className="content">
                    <h3>Department of Computer Science</h3>
                    <p>The Department of Computer Science is one of the youngest constituent units of the Faculty of Natural Sciences. It was established in the year 1999 with the objective of producing IT professionals of international standard and to primary fulfill the requirements of the booming IT industry and develop researchers. The Department offers three postgraduate programs including the regular programs MCA and PGDCA, and a self-financed evening program M.Sc. (Bioinformatics). 
                    In addition, it supports the execution of an undergraduate program B.Sc. in terms of teaching of Computer Science as a subject.</p>
                    <p>
                    The Department, with the current faculty strength of a Professor, one Associate Professor, one Reader, and ten 
                    Assistant Professors sufficiently cater to its requisite teaching and research requirements. Moreover, in order
                    to cater to the requirements of interdisciplinary courses, guest teachers from institutes such as IIT Delhi, 
                    AIIMS, National Institute of Immunology, and Jamia Hamdard University are regularly invited, as per requirements.
                    </p>
                    <p>
                    The Department of Computer Science is an exciting place in which the faculty is friendly, well qualified, and able to provide a supportive environment for students to study.
                    </p>
                </div>
            </div>
            <div className="infra">
                <div className="content">
                    <h3>Infrastructure and Facilities</h3>
                    <p>The Department has two modern air-conditioned computing labs, an air-conditioned seminar room, a departmental library,
                    four classrooms, and adequate offices for staff members. The Department has also one air-conditioned Research Laboratory 
                    for research scholars in the Department.</p>
                    <p>The whole Department is connected through a LAN in order to provide modern teaching and learning environment and fast 
                    access to the Internet. In addition, the Department has Wi-Fi connectivity. The LAN caters to many important computing needs
                    of the Department such as compilers of the popular programming languages, RDBMS software (Oracle, SQL server), communication
                    facility, and Internet facility. All the labs, the seminar room, office are connected through LAN. There is one Itanium 
                    Server with WIN 2003 OS in the lab. One Plasma Screen is installed in the Laboratory to demonstrate practical work to the 
                    students.</p>
                </div>
                <div className="image-box">
                    <img src={require("../images/about-image/department/Galib.jpg")} alt="" />
                </div>
            </div>
        </section>
    )
}