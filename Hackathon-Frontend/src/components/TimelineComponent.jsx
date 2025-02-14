import "../styles/timeline.css";

function TimelineComponent() {
  return (
    <div>
      <div class="timeline">
        <ul>
          <li>
            <div class="timeline-content">
              <h3>12h ago</h3>
            </div>
          </li>
          <li>
            <div class="timeline-content">
              <h3>8h ago</h3>
            </div>
          </li>
          <li>
            <div class="timeline-content">
              <h3>4h ago</h3>
            </div>
          </li>
          <li>
            <div class="timeline-content">
              <h3>now </h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default TimelineComponent;
