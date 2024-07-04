const TabsNavigation = ({
    selectedIndex = 0,
    setSelectedIndex,
    tabLabels = [],
    navClassName = "",
    childClassName = "",
    children,
    ...props
}) => {
    return (
        <div {...props}>
            <nav>
                <ul className={"flex px-2 " + navClassName}>
                    {tabLabels.map((label, index) => (
                        <li
                            key={index}
                            className={
                                "text-sm bg-white/75 hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer px-4 py-2 rounded-t-lg " +
                                (index === selectedIndex
                                    ? " border-b-2 border-blue-500"
                                    : "")
                            }
                            onClick={() => setSelectedIndex(index)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </nav>

            {children[selectedIndex] && (
                <div className={childClassName}>{children[selectedIndex]}</div>
            )}
        </div>
    );
};

export default TabsNavigation;
