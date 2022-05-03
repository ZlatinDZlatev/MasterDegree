import  React  from  "react";
const  ThemeContext  =  React.createContext(false);
const  ThemeProvider  =  ({ children })  =>  {
    const  [toggle, setToggle]  =  React.useState(false);
    const toggleFunction =  ()  =>  {
    console.log(toggle)
    setToggle(!toggle);
};
return  (
    <ThemeContext.Provider value={{toggle, toggleFunction}}>
        {children}
    </ThemeContext.Provider>
    );
};
export  {  ThemeContext,  ThemeProvider  };