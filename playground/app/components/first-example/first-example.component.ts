import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'first-example',
  templateUrl: './first-example.component.html',
  styleUrls: ['./first-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstExampleComponent {

  public html;
  public styles;

  constructor() {
    this.html = this._getHtml();
    this.styles = this._getStyles();
  }

  public loaded(el) {
    console.log('loaded', el);
  }

  public changeHtml(): void {
    this.html = 'New HTML';
  }

  private _getHtml(): string {
    return `<div class="main">
    <h2>TITLE HEADING</h2>
    <h5>Title description, Dec 7, 2017</h5>
    <div class="fakeimg" style="height:200px;">Image</div>
    <p>Some text..</p>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    <br>
    <h2>TITLE HEADING</h2>
    <h5>Title description, Sep 2, 2017</h5>
    <div class="fakeimg" style="height:200px;">Image</div>
    <p>Some text..</p>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
  </div>`;
  }

  private _getStyles(): string {
    return `* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

.header {
  padding: 80px;
  text-align: center;
  background: #1abc9c;
  color: white;
}

.header h1 {
  font-size: 40px;
}

.navbar {
  overflow: hidden;
  background-color: #333;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}

.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}


.navbar a.right {
  float: right;
}

.navbar a:hover {
  background-color: #ddd;
  color: black;
}

.navbar a.active {
  background-color: #666;
  color: white;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
}

.side {
  -ms-flex: 30%; /* IE10 */
  flex: 30%;
  background-color: #f1f1f1;
  padding: 20px;
}

.main {
  -ms-flex: 70%; /* IE10 */
  flex: 70%;
  background-color: white;
  padding: 20px;
}

.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

.footer {
  padding: 20px;
  text-align: center;
  background: #ddd;
}

@media screen and (max-width: 700px) {
  .row {
    flex-direction: column;
  }
}

@media screen and (max-width: 400px) {
  .navbar a {
    float: none;
    width: 100%;
  }
}`;
  }
}
