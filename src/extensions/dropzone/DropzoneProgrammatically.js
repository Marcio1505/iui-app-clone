import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap"
import { useDropzone } from "react-dropzone"

function ProgrammaticallyDropzone(props) {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps, open } = useDropzone({
    // accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const thumbs = files.map(file => (
    <div className="dz-thumb" key={file.name}>
      <div className="dz-thumb-inner">
        <img src={file.preview} className="dz-img" alt={file.name} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="mx-1">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <Button.Ripple color="primary" outline className="my-1" onClick={open}>
        Open File Dialog
      </Button.Ripple>
      <aside className="thumb-container">{thumbs}</aside>
    </section>
  )
}

class DropzoneProgrammatically extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Opening File Dialog Programmatically</CardTitle>
        </CardHeader>
        <CardBody>
          <ProgrammaticallyDropzone />
        </CardBody>
      </Card>
    )
  }
}

export default DropzoneProgrammatically
