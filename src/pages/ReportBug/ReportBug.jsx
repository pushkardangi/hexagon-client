import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { reportBug } from "../../api";
import { ShoutOutCard } from "../../components";

const ReportBug = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [browser, setBrowser] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [os, setOs] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;

    const detectBrowser = async () => {
      let browserName = "Unknown";

      if (navigator.brave && navigator.brave.isBrave) {
        const isBrave = await navigator.brave.isBrave();
        if (isBrave) {
          browserName = "Brave";
        }
      } else if (/Edg/i.test(ua)) {
        browserName = "Edge";
      } else if (/OPR/i.test(ua)) {
        browserName = "Opera";
      } else if (/Chrome/i.test(ua) && !/Edg/i.test(ua) && !/OPR/i.test(ua)) {
        browserName = "Chrome";
      } else if (/Firefox/i.test(ua)) {
        browserName = "Firefox";
      } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
        browserName = "Safari";
      }

      setBrowser(browserName);
    };

    detectBrowser();

    // Device detection
    let deviceType = "Unknown";
    if (/Windows|Macintosh|Linux/i.test(ua)) {
      deviceType = "Desktop";
    } else if (/Android/i.test(ua)) {
      deviceType = "Mobile";
    } else if (/iPhone|iPod/i.test(ua)) {
      deviceType = "Mobile";
    } else if (/iPad|Tablet/i.test(ua)) {
      deviceType = "Tablet";
    }

    setDeviceType(deviceType);

    const osInfo = ua.match(/\(([^)]+)\)/)?.[1];
    if (osInfo) {
      setOs(osInfo);
    } else if (navigator.userAgentData) {
      setOs(navigator.userAgentData.platform);
    }
  }, []);

  const resetFormandGoBack = () => {
    setTitle("");
    setType("");
    setDescription("");
    setSeverity("");
    setBrowser("");
    setDeviceType("");
    setOs("");

    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normTitle = title.trim();
    const normType = type.trim();
    const normDescription = description.trim();
    const normBrowser = browser.trim();
    const normDeviceType = deviceType.trim();
    const normOs = os.trim();

    if (!normTitle || !normType || !normDescription || !severity || !normBrowser || !normType || !normOs) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: normTitle,
        type: normType,
        description: normDescription,
        severity,
        environment: {
          browser: normBrowser,
          deviceType: normDeviceType,
          os: normOs,
        },
      };

      const res = await reportBug(payload);

      if (res.statusCode === 201) {
        toast.success("Bug reported successfully");
        setTitle("");
        setType("");
        setDescription("");
        setSeverity("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to report bug.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-5xl w-full p-2 md:px-6 pb-10">
        <ShoutOutCard
          title="Get Featured in What’s New!"
          description="Every helpful bug report increases your chance of a shout-out in our upcoming features & fixes page."
          ctaText="Check What’s New →"
          ctaLink="/whats-new"
        />

        <h1 className="text-2xl font-bold mb-6">Report a Bug</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Short bug title"
            />
          </div>

          {/* Bug Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Bug Type *</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="">Select Bug Type</option>
              <option value="UI">UI</option>
              <option value="Backend">Backend</option>
              <option value="Performance">Performance</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 h-24"
              placeholder={`What you did:\nWhat you expected:\nWhat actually happened:`}
            />
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium mb-1">Severity *</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Environment */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Browser *</label>
              <input
                type="text"
                value={browser}
                onChange={(e) => setBrowser(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Device Type *</label>
              <input
                type="text"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Operating System *</label>
              <input
                type="text"
                value={os}
                onChange={(e) => setOs(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={resetFormandGoBack}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Bug"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportBug;
