const BackgroundIcon = ({ className = "w-6 h-6 fill-white", style = {} }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="90" className={className}
            style={style}
        >
            <g>
                <circle cx="10" cy="10" r="4" />
                <circle cx="30" cy="10" r="4" />
                <circle cx="50" cy="10" r="4" />
                <circle cx="70" cy="10" r="4" />
                <circle cx="90" cy="10" r="4" />

                <circle cx="10" cy="30" r="4" />
                <circle cx="30" cy="30" r="4" />
                <circle cx="50" cy="30" r="4" />
                <circle cx="70" cy="30" r="4" />
                <circle cx="90" cy="30" r="4" />

                <circle cx="10" cy="50" r="4" />
                <circle cx="30" cy="50" r="4" />
                <circle cx="50" cy="50" r="4" />
                <circle cx="70" cy="50" r="4" />
                <circle cx="90" cy="50" r="4" />

            </g>
        </svg>

    );
}
export default BackgroundIcon;