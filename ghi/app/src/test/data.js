

// Headers ------> <Header dataID={data1} />
// <Header dataID={data1} />  ------> Headers


export default function Header({ dataID }) {
    if (dataID){
        console.log(dataID);
    }

    return (
        <div>
            <h1>
                Header
            </h1>
        </div>
    )
}
