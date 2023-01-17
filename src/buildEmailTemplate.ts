import { AppData } from "./types";

const buildEmailTemplate = (inp: AppData) => {
  return `
  <html>
    <head>
      <title>Meter Report</title>
      <style>
        table {
            max-width: 500px;
            width: 100%;
            border: 1px solid black;
            border-collapse: collapse;
            margin: 12px auto;
        }
        td {
            border: 1px solid black;
            text-align: center;
            padding: 8px 12px;
        }
        .table_list {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .header {
            background-color: #e0e0e0;
            padding: 8px;
            font-weight: bold;
        }
        .label {
            font-weight: bold;
        }
        .additional_info_container {
            width: 100%;
            max-width: 500px;
            text-align: center;
            margin: 12px 0px;
            border: 1px solid black;
        }
        .additional_info_title {
            font-weight: bold;
            background-color: #e0e0e0;
            padding: 8px;
            border-bottom: 1px solid black;
        }
        .additional_info_output {
            padding: 8px;
        }
        .nearest {
            background-color: lightgreen;
            
        }
        .estimated {
            background-color: #ffee58;
            
        }
        .difference {
            background-color: #FA5F5566;
        }
        .section_header {
            font-weight: bold;
            background-color: #fafafa;
            padding: 12px 0px;
        }
        .screenshot_title {
          margin: 8px 0px;
          font-weight: bold;
        }
        img {
          margin: 0 auto;
        }
      </style>
    </head>
    <body>
      <div class="table_list">
        <table>
          <tr>
            <td colspan="2" class="header">Meter Info</td>
          </tr>
            <tr>
            <td class="label">Time</td>
            <td>${inp.info.time}</td>
          </tr>
          <tr>
            <td class="label">Meter #</td>
            <td>${inp.info.meter_number}</td>
          </tr>
          <tr>
            <td class="label">IP Address</td>
            <td>${inp.info.ip_address}</td>
          </tr>
          <tr>
            <td class="label">Latitude</td>
            <td>${inp.info.location.latitude}</td>
          </tr>
          <tr>
            <td class="label">Longitude</td>
            <td>${inp.info.location.longitude}</td>
          </tr>
        </table>
        
        <div class="additional_info_container">
            <div class="additional_info_title">Additional Info</div>
            <div class="additional_info_output">
                ${inp.info.additional_notes}
            </div>
        </div>
        
        <table>
          <tr>
            <td colspan="2" class="header">Inputs</td>
          </tr>
            <tr>
            <td class="label">Circumference (w/ Insulation)</td>
            <td>${inp.inputs.circumference}</td>
          </tr>
          <tr>
            <td class="label">Insulation Thickness</td>
            <td>${inp.inputs.thickness}</td>
          </tr>
          <tr>
            <td class="label">Temperature</td>
            <td>${inp.inputs.temperature}</td>
          </tr>
          <tr>
            <td class="label">Schedule</td>
            <td>${inp.inputs.schedule}</td>
          </tr>
        </table>
        
         <table>
          <tr>
            <td colspan="2" class="header">Outputs</td>
          </tr>
            <tr>
            <td class="label nearest">Nearest Table Nominal Size</td>
            <td class="nearest">${inp.outputs.nominal_size}</td>
          </tr>
          <!---->
          <tr>
            <td colspan="2" class="section_header">Output Diameter</td>
          </tr>
          <tr>
            <td class="label nearest">Nearest Table Value</td>
            <td class="nearest">${inp.outputs.outer_diameter.nearest}</td>
          </tr>
          <tr>
            <td class="label estimated">Estimated</td>
            <td class="estimated">${inp.outputs.outer_diameter.estimated}</td>
          </tr>
          <tr>
            <td class="label difference">Difference</td>
            <td class="difference">${inp.outputs.outer_diameter.difference}</td>
          </tr>
          <!---->
           <tr>
            <td colspan="2" class="section_header">Wall Thickness</td>
          </tr>
           <tr>
            <td class="label nearest">Nearest Table Value</td>
            <td class="nearest">${inp.outputs.wall_thickness.nearest}</td>
          </tr>
          <tr>
            <td class="label estimated">Estimated</td>
            <td class="estimated">${inp.outputs.wall_thickness.estimated}</td>
          </tr>
          <tr>
            <td class="label difference">Difference</td>
            <td class="difference">${inp.outputs.wall_thickness.difference}}</td>
          </tr>
          <!---->
          <tr>
            <td colspan="2" class="section_header">Speed of Sound</td>
          </tr>
          <tr>
            <td class="label nearest">Nearest Table Value</td>
            <td class="nearest">${inp.outputs.speed_of_sound.nearest}</td>
          </tr>
          <tr>
            <td class="label estimated">Estimated</td>
            <td class="estimated">${inp.outputs.speed_of_sound.estimated}</td>
          </tr>
          <tr>
            <td class="label difference">Difference</td>
            <td class="difference">${inp.outputs.speed_of_sound.difference}</td>
          </tr>
        </table>
        <div class="screenshot_title">Screenshot</div>
        <img src="cid:report" />
      </div>
    </body>
  </html>
  `;
};

export default buildEmailTemplate;
