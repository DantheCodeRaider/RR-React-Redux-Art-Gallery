import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { clearData, fetchData, incrementId, decrementId, inputId } from './features/dataSlice'
import { useEffect } from 'react';

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if (data.apiData) {
      return <img style={{ 'width': '100vw' }} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])


  return (
    <div className="App">
      <div className='container'>
        <header>
          <h1>The Met Museum</h1>
          <h3>{data.apiData.title}</h3>
          <h4>By: {data.apiData.artistDisplayName}</h4>
          <h4>{data.apiData.artistDisplayBio}</h4>
          <p className='apiID'>Art API Object ID: {data.objectId}</p>
        </header>
        <div>
          <input value={data.objectId} onChange={(e) => {
            dispatch(inputId(Number(e.target.value)))
          }} />
        </div>
        <div className='myButtons'>

          <p><button onClick={() => dispatch(fetchData())}>Thunk!</button></p>
          <p><button onClick={() => dispatch(incrementId())}>Next</button></p>
          <p><button onClick={() => dispatch(decrementId())}>Back</button></p>
          <p><button onClick={() => dispatch(clearData())}>Clear</button></p>
        </div>
        <div>
          {renderImg()}
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => ({ objectId: state.data.objectId })

export default connect(mapStateToProps)(App);

