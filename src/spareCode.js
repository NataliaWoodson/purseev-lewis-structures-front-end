<Layer>
  <Group>
    {atoms.map((atom) => (
      <Group>
        {/* <Text
                x={atom.x}
                y={atom.y}
                text={atom.text}
                draggable
                fontSize={30}
              /> */}
      </Group>
    ))}
  </Group>
</Layer>;


const [lineData, setLineData] = useState([]);

lineData = [
  [electronId1, electronId2],
  [electronId3, electronId4]
]

lineData.map((entry) => {
  const electronId1 = entry[0];
  const electronId2 = entry[1];
  const atomId1 = electronId1.atomId;
  const atomId2 = electronId2.atomId;
  
  const electron1 = getElectronById(electronId1);
  const electron2 = getElectronById(electronId2);

  const atom1x = getAtomPositionFromId(atomId1)[0];
  const atom1y = getAtomPositionFromId(atomId1)[1];
  
  const atom2x = getAtomPositionFromId(atomId2)[0];
  const atom2y = getAtomPositionFromId(atomId2)[1]

  const electron1offsetX = electron1.offsetX;
  const electron1offsetY = electron1.offsetY;

  const electron2offsetX = electron2.offsetX;
  const electron2offsetY = electron2.offsetY;

  const points = [
    atom1x + electron1offsetX,
    atom1y + electron1offsetY,
    atom2x + electron2offsetX,
    atom2y + electron2offsetY
  ]
  <Line 
    stroke="red",
    points={points},
    stroke-weight={3}
  />

})