import React, { useState } from "react"
import { Modal, IconButton, Box, Fade, Backdrop, Zoom, Typography, Grid } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"

// Data Sertifikat berdasarkan dokumen yang diupload
const MY_CERTIFICATES = [
    {
        id: 1,
        title: "IT SPECTA - Mobile App Design",
        issuer: "Universitas Muhammadiyah Yogyakarta",
        img: "https://pkqhzggutvbwmxuegbrm.supabase.co/storage/v1/object/public/profile-images/18%20(1).jpg" // Ganti dengan link gambar 18 (1).jpg
    },
    {
        id: 2,
        title: "Certificate of Internship",
        issuer: "CAZH Academy Purwokerto",
        img: "https://pkqhzggutvbwmxuegbrm.supabase.co/storage/v1/object/public/profile-images/certificate_page-0001.jpg" // Ganti dengan link hasil scan/export certificate.pdf
    }
];

const CertificateCard = ({ img, title, issuer }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ width: "100%", mb: 4 }}>
            <Typography variant="subtitle1" sx={{ color: "white", mb: 1, fontWeight: 500 }}>
                {title} — <span style={{ opacity: 0.7 }}>{issuer}</span>
            </Typography>
            
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                    background: "rgba(0,0,0,0.2)", 
                    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.4)",
                        "& .overlay": { opacity: 1 },
                        "& .hover-content": { transform: "translate(-50%, -50%)", opacity: 1 },
                        "& .certificate-image": { filter: "contrast(1.05) brightness(1) saturate(1.1)" },
                    },
                }}>
                <Box sx={{ position: "relative" }}>
                    <img
                        className="certificate-image"
                        src={img}
                        alt={title}
                        style={{
                            width: "100%",
                           height: "auto", // Biarkan tinggi mengikuti proporsi asli
                            maxHeight: "250px", // Batasi tinggi maksimal agar tetap rapi
                            display: "block",
                            objectFit: "contain", // AGAR TIDAK TERPOTONG
                            transition: "filter 0.3s ease",
                            cursor: "pointer"
                        }}
                        onClick={handleOpen}
                    />
                </Box>

                <Box className="overlay" onClick={handleOpen}
                    sx={{
                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                        opacity: 0, transition: "all 0.3s ease", cursor: "pointer", zIndex: 2,
                        backgroundColor: "rgba(0,0,0,0.4)"
                    }}>
                    <Box className="hover-content"
                        sx={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -60%)", opacity: 0,
                            transition: "all 0.4s ease", textAlign: "center", width: "100%", color: "white"
                        }}>
                        <FullscreenIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>View Full</Typography>
                    </Box>
                </Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, sx: { backgroundColor: "rgba(0, 0, 0, 0.92)", backdropFilter: "blur(8px)" } }}>
                <Fade in={open}>
                    <Box sx={{ position: "relative", outline: "none", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <IconButton onClick={handleClose} 
                            sx={{ position: "absolute", right: 20, top: 20, color: "white", bgcolor: "rgba(255,255,255,0.1)", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}>
                            <CloseIcon />
                        </IconButton>
                        <img src={img} alt="Full View" style={{ maxWidth: "90%", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }} />
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

const Certificate = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={3}>
                {MY_CERTIFICATES.map((cert) => (
                    <Grid item xs={12} md={6} key={cert.id}>
                        <CertificateCard img={cert.img} title={cert.title} issuer={cert.issuer} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Certificate;