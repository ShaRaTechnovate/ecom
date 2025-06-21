import React, { useState } from 'react';
import './index.css';
import Navbar from '../../navbar';
import FooterSection from '../../footer';

const CustomizeProduct = () => {
	// List of CSS files
	const cssFiles = ['style.css', 'bootstrap.css', 'bootstrap.min.css', 'style.min.css'];
	const cssFiles2 = ['font-awesome.css', 'font-awesome.min.css'];
	const cssFiles3 = ['bootstrap-colorpicker.css', 'bootstrap-colorpicker.css.map', 'bootstrap-colorpicker.min.css', 'bootstrap-colorpicker.min.css.map'];

	// List of JS files
	const jsFiles = ['bootstrap.js', 'bootstrap.min.js', 'fabric4.js', 'fabric4.min.js', 'fontfaceobserver.js', 'jquery.js', 'jquery.min.js', 'main.js', 'main.min.js', 'merge-images.js', 'placeholders.js', 'placeholders.min.js'];
	const jsFiles2 = ['bootstrap-colorpicker.js', 'bootstrap-colorpicker.min.js']

	return <>
		{/* Render CSS files */}
		{cssFiles.map((cssFile, index) => (
			<link key={index} rel="stylesheet" href={process.env.PUBLIC_URL + '/customProduct/css/' + cssFile} />
		))}
		{cssFiles2.map((cssFile, index) => (
			<link key={index} rel="stylesheet" href={process.env.PUBLIC_URL + '/customProduct/font-awesome/css/' + cssFile} />
		))}
		{cssFiles3.map((cssFile, index) => (
			<link key={index} rel="stylesheet" href={process.env.PUBLIC_URL + '/customProduct/js/colorpicker/css/' + cssFile} />
		))}

		{/* Render JS files */}
		{jsFiles.map((jsFile, index) => (
			<script key={index} src={process.env.PUBLIC_URL + '/customProduct/js/' + jsFile}></script>
		))}
		{jsFiles2.map((jsFile, index) => (
			<script key={index} src={process.env.PUBLIC_URL + '/customProduct/js/colorpicker/js/' + jsFile}></script>
		))}
		<div>
		<Navbar />
		</div>
		<div style={{marginTop:'50px'}}>
			<div className="container-fluid">
				<div className="row">
					{/* <!-- left column --> */}
					<div className="col-md-2">
						<div className="leftLayout" id="leftLayoutContainer">
							<div>Type</div>
							<div className="btn-group" data-toggle="buttons">
								<div className="btn typeButton active">
									<input type="radio" name="form_shirt_type" value="1" autocomplete="off" checked />
									<img src="/customProduct/images/shirts/men1_blue_front.png" /><br />
									<div className="typename">Men</div>
								</div>
								<div className="btn typeButton">
									<input type="radio" name="form_shirt_type" value="2" autocomplete="off" />
									<img src="/customProduct/images/shirts/women_black_front.png" /><br />
									<div className="typename">Women</div>
								</div>
							</div>
							<div id="div_colors_title">Color</div>
							<div className="btn-group" data-toggle="buttons" id="div_colors">
								<div className="btn colorButton active" style={{ "backgroundColor": "#0268b0" }}>
									<input type="radio" name="form_shirt_color" value="1" autocomplete="off" checked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</div>
								<div className="btn colorButton" style={{ "backgroundColor": "#ffffff" }}>
									<input type="radio" name="form_shirt_color" value="2" autocomplete="off" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</div>
							</div>
							<div className="btn-toolbar">
								<div className="add_image btn-group">
									<iframe id="ifr_upload" name="ifr_upload" height="0" width="0" frameborder="0"></iframe>
									<form id="frm_upload" action="" method="post" enctype="multipart/form-data" target="ifr_upload">
										<label className="btn btn-default btn-file">
											<i className="fa fa-picture-o"></i>&nbsp;&nbsp;Add image<input type="file" name="image_upload" accept=".gif,.jpg,.jpeg,.png,.ico" />
										</label>
									</form>
								</div>
								<div className="add_text btn-group">
									<button type="button" className="btn btn-default" id="btn_addtext"><i className="fa fa-font"></i>&nbsp;&nbsp;Add text</button>
								</div>
								<div className="add_album btn-group">
									<button type="button" className="btn btn-default" data-toggle="modal" data-target="#albumModal"><i className="fa fa-th"></i>&nbsp;&nbsp;Album</button>
								</div>
							</div>
							<div className="message">
							</div>
						</div>
					</div>
					{/* <!-- center column --> */}
					<div className="col-md-8">
						<div className="centerLayout" id="centerLayoutContainer">
							<div className="shirt"><img src="/customProduct/images/shirts/men1_blue_front.png" id="img_shirt" /></div>
							<div className="cvtoolbox">
								<div className="btn-group">
									<button type="button" className="btn btn-default" id="toolbox_centerh"><i className="fa fa-arrows-h fa-lg"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_up"><i className="fa fa-arrow-up"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_centerv"><i className="fa fa-arrows-v fa-lg"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_flipx"><i className="fa fa-road fa-lg"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_flipy"><i className="fa fa-road fa-lg fa-rotate-90"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_remove"><i className="fa fa-trash-o fa-lg"></i></button>
								</div>
							</div>
							<div className="cvtoolbox cvtoolbox_2nd">
								<div className="btn-group">
									<button type="button" className="btn btn-default" id="toolbox_left"><i className="fa fa-arrow-left"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_center"><i className="fa fa-arrows fa-lg"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_right"><i className="fa fa-arrow-right"></i></button>
									<button type="button" className="btn btn-default nobtn">&nbsp;</button>
									<button type="button" className="btn btn-default nobtn">&nbsp;</button>
									<button type="button" className="btn btn-default nobtn">&nbsp;</button>
								</div>
							</div>
							<div className="cvtoolbox cvtoolbox_3rd">
								<div className="btn-group">
									<button type="button" className="btn btn-default" id="toolbox_totop"><i className="fa fa-step-backward fa-lg fa-rotate-90"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_down"><i className="fa fa-arrow-down"></i></button>
									<button type="button" className="btn btn-default" id="toolbox_tobottom"><i className="fa fa-step-forward fa-lg fa-rotate-90"></i></button>
									<button type="button" className="btn btn-default nobtn">&nbsp;</button>
									<button type="button" className="btn btn-default nobtn">&nbsp;</button>
									<button type="button" className="btn btn-default nobtn">&nbsp;</button>
								</div>
							</div>
							<div className="cvtoolbox_info"><div><span></span></div></div>
							<div id="div_canvas_front" style={{ "marginTop": "155px" }}>
								<canvas id="mainCanvas_front" width="260" height="350" className="shirt_canvas"></canvas>
							</div>
							<div id="div_canvas_back" style={{ "marginTop": "155px" }}>
								<canvas id="mainCanvas_back" width="260" height="350" className="shirt_canvas"></canvas>
							</div>
							<div className="btn-group twosides" data-toggle="buttons">
								<div className="btn active">
									<input type="radio" name="form_shirt_side" value="front" autocomplete="off" checked />
									<div className="sidename"><i className="fa fa-bookmark-o"></i> Front</div>
								</div>
								<div className="btn">
									<input type="radio" name="form_shirt_side" value="back" autocomplete="off" />
									<div className="sidename"><i className="fa fa-bookmark"></i> Back</div>
								</div>
							</div>
							<div className="div_reviewbtn">
								<button type="button" className="btn btn-default" data-toggle="modal" data-target="#reviewModal"><i className="fa fa-eye"></i> Preview</button>
								<div className="dropup">
									<button className="btn btn-default dropdown-toggle" type="button" id="dropdownDownload" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<i className="fa fa-save"></i> Download
									</button>
									<ul className="dropdown-menu" aria-labelledby="dropdownDownload">
										<li><a href="#" id="btnDownloadDesign">Design Only</a></li>
										<li><a href="#" id="btnDownloadShirt">Design & Shirt</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- right column --> */}
					<div className="col-md-2">
						<div className="rightLayout" id="rightLayoutContainer">
							<div className="texttoolbox">
							</div>
							<div className="message">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		{/* <!-- Preview Modal --> */}
		<div id="reviewModal" className="modal fade" role="dialog">
			<div className="modal-dialog">
				{/* <!-- Modal content--> */}
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal">&times;</button>
						<h4 className="modal-title">&nbsp;</h4>
					</div>
					<div className="modal-body">
						<div className="shirt"><img src="/customProduct/" /></div>
						<div className="shirtdesign"><img src="/customProduct/" /></div>
					</div>
				</div>
			</div>
		</div>

		{/* <!-- Album Modal --> */}
		<div id="albumModal" className="modal fade" role="dialog">
			<div className="modal-dialog">
				{/* <!-- Modal content--> */}
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal">&times;</button>
						<h4 className="modal-title">Album</h4>
					</div>
					<div className="modal-body">
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image1.png)" }}><img bgsrc="/customProduct/images/album/image1.png" src="/customProduct/images/blank.png" /></div></a>
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image2.png)" }}><img bgsrc="/customProduct/images/album/image2.png" src="/customProduct/images/blank.png" /></div></a>
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image3.png)" }}><img bgsrc="/customProduct/images/album/image3.png" src="/customProduct/images/blank.png" /></div></a>
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image4.png)" }}><img bgsrc="/customProduct/images/album/image4.png" src="/customProduct/images/blank.png" /></div></a>
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image5.png)" }}><img bgsrc="/customProduct/images/album/image5.png" src="/customProduct/images/blank.png" /></div></a>
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image6.png)" }}><img bgsrc="/customProduct/images/album/image6.png" src="/customProduct/images/blank.png" /></div></a>
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image7.png)" }}><img bgsrc="/customProduct/images/album/image7.png" src="/customProduct/images/blank.png" /></div></a>
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image8.png)" }}><img bgsrc="/customProduct/images/album/image8.png" src="/customProduct/images/blank.png" /></div></a>
						<a href="#" className="album-item"><div style={{ "backgroundImage": "url(images/album/image9.png)" }}><img bgsrc="/customProduct/images/album/image9.png" src="/customProduct/images/blank.png" /></div></a>
					</div>
				</div>
			</div>
		</div>
		<div style={{marginTop:'50px'}}>
			<FooterSection/>
		</div>
	</>
}

export default CustomizeProduct;