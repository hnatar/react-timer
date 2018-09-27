"use strict";

class Stopwatch extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			'mins': 0,
			'secs': 0,
			'started': false,
			'tickHandle': null,
			'paused': false
		}
	}

	tickFunction = () => {
		let seconds = this.state.secs;
		let minutes = this.state.mins;
		seconds = (seconds + 1) % 60;
		if( seconds === 0 ) {
			minutes = (minutes + 1) % 60;
		}
		this.setState( {
			secs: seconds,
			mins: minutes,
		})
	};

	stopTheWatch = () => {
		if( this.state.tickHandle && this.state.started === true) {
			clearInterval(this.state.tickHandle)
			this.setState( {mins: 0, secs: 0, started: false, tickHandle: null, paused: false} );
		}
	};

	startTheWatch = () => {
		if( this.state.tickHandle === null && this.state.started === false) {
			this.setState( {
				started: true,
				paused: false,
				tickHandle: setInterval( this.tickFunction, 1000 )
			});
		}
	};

	pauseTheWatch = () => {
		if( this.state.paused === false && this.state.tickHandle && this.state.started === true) {
			clearInterval(this.state.tickHandle)
			this.setState( {paused: true} )
		}
	};

	resumeTheWatch = () => {
		this.setState( {
			paused: false,
			tickHandle: setInterval( this.tickFunction, 1000 )
		});
	};

	render = () => {
		const TimeReadout = (props) => {
			console.log( props )
			return (
				<span class="flex-container time">
					<span style={{fontSize: '4rem'}}>
					{String(props.mins).padStart(2, '0')}:
					{String(props.secs).padStart(2, '0')}
					</span>
				</span>
			);
		};

		if( this.state.started === false ) {
			return (
				<div className="flex-container">
					<h1>React Helloworld</h1>
					<span className="muted">Timer stopped</span>
					<button onClick={this.startTheWatch}>Start Ticking!</button>
				</div>
			);
		}
		else {
			const PauseOrResume = () => {
				if( this.state.paused === false ) {
					return <button onClick={this.pauseTheWatch} className="orange" style={{'marginLeft': 'auto'}}>Pause</button>;
				}
				else {
					return <button onClick={this.resumeTheWatch} className="orange" style={{'marginLeft': 'auto'}}>Resume</button>
				}
			};
			return (
				<div className="flex-container">
					<h1>React Helloworld</h1>
					<TimeReadout mins={this.state.mins} secs={this.state.secs}></TimeReadout>
					<PauseOrResume />
					<button onClick={this.stopTheWatch} className="red">Stop</button>
				</div>
			);
		}
	};
};

ReactDOM.render( <Stopwatch />, document.getElementById("stopwatch") );
