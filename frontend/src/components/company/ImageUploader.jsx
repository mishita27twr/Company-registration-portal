import React, { useState, useRef } from 'react';
import { Box, Typography, Avatar, CircularProgress, IconButton } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { toast } from 'react-toastify';
import { uploadApi } from '../../api/uploadApi';

const ImageUploader = ({ type = 'logo', currentImage, onUploadSuccess, label }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPG, PNG, GIF, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      let result;
      if (type === 'logo') {
        result = await uploadApi.uploadLogo(file);
      } else {
        result = await uploadApi.uploadBanner(file);
      }
      toast.success(`${label || type} uploaded successfully!`);
      if (onUploadSuccess) onUploadSuccess(result);
    } catch (err) {
      toast.error(err?.response?.data?.message || `Failed to upload ${label || type}`);
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const isLogo = type === 'logo';

  return (
    <Box>
      {label && (
        <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1}>
          {label}
        </Typography>
      )}

      {isLogo ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            className="upload-dropzone"
            onClick={handleClick}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            {uploading ? (
              <CircularProgress size={28} />
            ) : preview ? (
              <img src={preview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Box sx={{ textAlign: 'center', p: 1 }}>
                <CloudUploadOutlinedIcon sx={{ color: '#93c5fd', fontSize: 28 }} />
                <Typography variant="caption" color="text.secondary" display="block">
                  Upload
                </Typography>
              </Box>
            )}
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Accepted: JPG, PNG, GIF, WebP
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Max size: 5MB
            </Typography>
            {preview && (
              <IconButton size="small" onClick={handleRemove} sx={{ ml: 1, color: '#ef4444' }}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          className="upload-dropzone"
          onClick={handleClick}
          sx={{
            width: '100%',
            height: preview ? 'auto' : 140,
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          {uploading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140 }}>
              <CircularProgress size={32} />
            </Box>
          ) : preview ? (
            <Box sx={{ position: 'relative' }}>
              <img
                src={preview}
                alt="banner"
                style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
              />
              <IconButton
                size="small"
                onClick={handleRemove}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  '&:hover': { backgroundColor: 'rgba(239,68,68,0.8)' },
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 140 }}
            >
              <CloudUploadOutlinedIcon sx={{ color: '#93c5fd', fontSize: 36, mb: 1 }} />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Click to upload banner image
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Recommended: 1200 x 300px · JPG, PNG · Max 5MB
              </Typography>
            </Box>
          )}
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
