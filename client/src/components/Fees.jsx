import React from "react";
import Layout from "./Layout";
import "../css/fees.css";
import "../css/page.css";

const Fees = () => {
  return (
    <Layout>
      <div className="container my-4">
        <div className="fees-overview">
          <div className="demand">
            <span className="amount">319,760</span>
            <br />
            <span className="amount-status">Total demand</span>
          </div>
          <div className="paid">
            <span className="amount">216,293</span>
            <br />
            <span className="amount-status">Total paid</span>
          </div>
          <div className="due">
            <span className="amount">23,501</span>
            <br />
            <span className="amount-status">Total due</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="pcontainer">
              <h5>Semester Overview</h5>
              <div className="table table-responsive">
                <table className="table table-borderless">
                  <tr>
                    <td className="text-demand">
                      <i className="bi bi-credit-card-2-front" /> Semester demand
                    </td>
                    <td align="right" className="text-demand fw-bold">
                      51,500
                    </td>
                  </tr>
                  <tr>
                    <td className="text-paid">
                      <i className="bi bi-check2-square" /> Paid till this day
                    </td>
                    <td align="right" className="text-paid fw-bold">
                      20,500
                    </td>
                  </tr>
                  <tr>
                    <td className="text-paid">
                      <i className="bi bi-card-checklist" /> Waiver
                    </td>
                    <td align="right" className="text-paid fw-bold">
                      16,000
                    </td>
                  </tr>
                  <tr>
                    <td className="text-due">
                      <i className="bi bi-info-square" /> Total due
                    </td>
                    <td align="right" className="text-due fw-bold">
                      15,000
                    </td>
                  </tr>
                </table>
              </div>
              <div className="pay-btn">
                <button className="btn btn-lg btn-primary px-5">Pay now</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="pcontainer">
              <h5>Fees breakdown</h5>
              <div className="table table-responsive">
                <table className="table table-borderless">
                  <tr>
                    <td>+ Registration fee</td>
                    <td align="right">
                      <b>5000</b>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan="2" className="borderless">
                      Tuition fee per credit
                    </td>
                    <td align="right" className="borderless">
                      2250
                    </td>
                  </tr>
                  <tr>
                    <td align="right">
                      <small>x20 cr</small>
                    </td>
                  </tr>
                  <tr>
                    <td>+ Total</td>
                    <td align="right">
                      <b>45,000</b>
                    </td>
                  </tr>
                  <tr>
                    <td>+ Miscellaneous</td>
                    <td align="right">
                      <b>500</b>
                    </td>
                  </tr>
                  <tr>
                    <td className="borderless">= Net Total</td>
                    <td className="borderless" align="right">
                      <b>50,500</b>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="pcontainer">
          <h5>Tuition Fee Waiver</h5>
          <div className="text-success text-center py-4 fs-3">Congratulations! You have obtained 25% tuition fee waiver.</div>
        </div>
      </div>
    </Layout>
  );
};

export default Fees;
