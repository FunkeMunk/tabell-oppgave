import React from "react";
interface IProps{
    setview:(value: string) => void, 
}

export function Undo ({setview}: IProps){
        return(
            <div onClick={() => setview('list')}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 511.983 511.983" enableBackground="new 0 0 511.983 511.983" xmlSpace="preserve" width='35px' >
                <path fill="#2196F3" d="M255.983,160.199V63.986c-0.007-5.891-4.788-10.661-10.679-10.655
                    c-2.134,0.002-4.218,0.645-5.983,1.844l-234.667,160c-4.866,3.321-6.119,9.957-2.798,14.823c0.75,1.099,1.699,2.048,2.798,2.798
                    l234.667,160c4.873,3.311,11.507,2.045,14.817-2.828c1.199-1.765,1.841-3.849,1.844-5.983v-95.68
                    c121.323,6.997,233.472,130.581,234.667,159.232v0.619c0.093,5.824,4.842,10.497,10.667,10.496l0,0
                    c5.891,0,10.667-4.776,10.667-10.667v-0.533C509.85,329.33,420.037,166.983,255.983,160.199z"/>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                </svg>                
            </div>

        )
}

export default (Undo)