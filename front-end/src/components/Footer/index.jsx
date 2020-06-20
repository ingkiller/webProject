import React,{memo} from "react";
const Footer = props=>{
    return <footer className="bg-secondary row justify-content-around  pt-3">

        <div className="col-sm-12 col-md-4 text-center text-light font-weight-bold small">
            <p className="mb-0">
                Posts Technologies D.P
            </p>
            <p>
                &copy; 2020 - 2021
            </p>
        </div>

        <div className="col-sm-12 col-md-4 text-center text-light font-weight-bold small">
            <p className="mb-0">
                Street 23, 6021 JD
            </p>
            <p>
                City, Country
            </p>
        </div>

        <div className="col text-center text-light font-weight-bold small">
            <p className="mb-0">
                <a className="text-light" href="mailto:contact@posts.com">contact@posts.com</a>
            </p>
            <p>
                <a className="text-light" href="http://www.posts.com">www.posts.com</a>
            </p>
        </div>

    </footer>
}

export default memo(Footer)

//justify-content-sm-start justify-content-sm-around
