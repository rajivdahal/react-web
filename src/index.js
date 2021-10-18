import React from "react";
import reactDom from "react-dom";
import {App} from './component/app.component'

reactDom.render(<App loggedin={3+4} hello="rajiv"></App>,document.getElementById('root'))