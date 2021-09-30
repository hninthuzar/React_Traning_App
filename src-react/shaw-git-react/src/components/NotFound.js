import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const NotFound = () => {
	return (
		<div className="container">
			<center>
				<div className="notfound">
					<FormattedMessage id="lbl.notfound" defaultMessage="OPPS!" />
				</div>
				<p style={{ fontSize: 16 }}>
					You are not authorized to view this page. 
					<Link to="/">GoHome</Link> ?
				</p>
			</center>
		</div>
	);
};

export default NotFound;
