import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';

function Spotify(){
    
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://unofficial-cricbuzz.p.rapidapi.com/teams/get-stats',
            params: {teamId: '2', statsType: 'mostRuns'},
            headers: {
              'X-RapidAPI-Key': '89865a66ddmsh6b7f9da0d9753bfp10eb43jsnc8503327b00c',
              'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
            }
        };
    
        axios.request(options)
          .then(response => setPlayers(response.data.values))
          .catch(error => console.error(error));
      }, []);
      console.log(players);
    return(
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className='navcontainer'>
                    <p className="header">Data from 3rd party API</p>
                </div>  
                <Link to="/" className="profilelink">ProfilePage</Link> 
            </nav>
        <h1>Trending Players in India</h1>
      {/* <ul>
        {players.map(player => (
          <li >
            {player.values[0]} ({player.values[1]}) ({player.values[2]}) ({player.values[3]}) ({player.values[4]}) ({player.values[5]})
          </li>
        ))}
      </ul> */}
            <div>
                <table class="table table-hover itemtable">
                    <thead className='tablehead'>
                        <tr>
                            <th>Batsmen</th>
                            <th >Matches</th>
                            <th >Innings</th>
                            <th >Runs</th>
                            <th >Average Score</th>
                        </tr>
                    </thead>
                    <tbody className='tablebody'>
                        {players.map(player => (
                            <tr>
                                <td>{player.values[1]}</td>
                                <td>{player.values[2]}</td>
                                <td>{player.values[3]}</td>
                                <td>{player.values[4]}</td>
                                <td>{player.values[5]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Spotify;